// components/sidebar/Sidebar.tsx
"use client";

import { useEffect, useState } from "react";
import { SidebarItem } from "./sidebarData";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Folder,
  FileText,
  Settings,
  Info,
  LogOut,
  ChevronDown,
  Edit,
  Trash,
  Edit2,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import Link from "next/link";
import { auth, firebaseSignOut } from "@/firebase";
import { ThemeToggler } from "./ThemeToggler";
import { useRootStore } from "../store/rootStore";
import { Skeleton } from "@/components/ui/skeleton";
import { title } from "process";
import { useParams, useRouter } from "next/navigation";
import { deleteNote, fetchNotes, updateNote } from "@/lib/api/notes";
import { v4 as uuidv4 } from 'uuid';
import { MY_WORKSPACE } from "@/lib/routeConstants";

type SidebarItemProps = {
  item: SidebarItem;
  level?: number;
  itemClick?: () => void;
};


const SidebarItemComponent = ({ item, itemClick, level = 0, }: SidebarItemProps) => {
  const router = useRouter();
  const params = useParams();
  const pathNoteId = params.id as string;
  const { setNotes, selectedNote } = useRootStore();

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(item.title);

  const hasChildren = item.type === "folder" && item.children?.length;

  const handleFileClick = (item: SidebarItem) => {
    if (itemClick) itemClick();
    router.push(`/${MY_WORKSPACE}/${item.id}`);
  };

  const handleTitleSave = async () => {
    setIsEditing(false);
    item.title = tempTitle;
    let res = await updateNote(item.id, { title: tempTitle })
    if(res) {
      const newNotes = await fetchNotes();
      if (newNotes) {
        setNotes(newNotes);
      }
    }
  };

  const handleDelete = async (id: string) => {
    // Implement delete logic here
    deleteNote(id);
    const newNotes = await fetchNotes();
    if (newNotes) {
      setNotes(newNotes);
    }
    if (selectedNote?.id === id) {
      const newNoteId = newNotes.length > 0 ? newNotes[0].id : uuidv4();
      router.push(`/${MY_WORKSPACE}/${newNoteId}`);
    }
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "group flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted/80 cursor-pointer transition-colors",
          {
            [`pl-${(level + 1) * 4}`]: true,
            "bg-muted/100": pathNoteId === item.id.toString() || (item.type === "folder" && open),
          }
        )}
        onClick={() => {
          if (hasChildren) {
            itemClick?.();
            setOpen(!open)
          } else {
            handleFileClick(item)
          }
        }}
      >
        {hasChildren ? (
          <ChevronRight
            className={cn("h-5 w-5 transition-transform", {
              "rotate-90": open,
            })}
          />
        ) : (
          <span className="w-5" />
        )}

        {
          !isEditing && <Edit2
            className="h-4 w-4 opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          />
        }

        {item.type === "folder" ? (
          <Folder className="h-5 w-5 text-primary" />
        ) : (
          <FileText className="h-5 w-5 text-primary" />
        )}

        {isEditing ? (
          <input
            autoFocus
            type="text"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleTitleSave();
              if (e.key === "Escape") {
                setTempTitle(item.title);
                setIsEditing(false);
              }
            }}
            className="bg-transparent border border-muted text-lg px-1 rounded focus:outline-none w-full"
          />
        ) : (
          <span
            className="text-lg truncate"
          >
            {item.title}
          </span>
        )}

        {!isEditing && (
          <div className="flex ml-auto gap-2">
            <Trash
              className="h-4 w-4 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.id);
              }}
            />
          </div>
        )}
      </div>

      {hasChildren && open && (
        <div className="pl-4 ml-auto">
          {item.children!.map((child) => (
            <SidebarItemComponent key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItemComponent;


export const Sidebar = ({ itemClick }: { itemClick?: () => void }) => {
  const { user, notes, setCreateNewNote } = useRootStore();
  const router = useRouter();

  let initialAvatar = "NA";
  if (user) {
    initialAvatar = user.name
      ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
      : "NA";
  }

  const sidebarItems: SidebarItem[] = notes?.map((note) => ({
    id: note.id,
    title: note.title,
    type: "page",
  }))
  return (
    <aside className="w-80 h-screen flex flex-col bg-background border-r border-muted text-foreground">

      {/* Workspace header */}
      {
        user ? (
          <div className="px-4 py-3 flex items-center justify-between border-b border-muted">
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 cursor-pointer hover:bg-muted px-2 py-1 rounded-md transition-colors w-full text-left">
                  <Avatar className="h-6 w-6 rounded-sm">
                    <AvatarImage src={user?.image ?? ""} alt="User" />
                    <AvatarFallback>{initialAvatar}</AvatarFallback>
                  </Avatar>
                  <span className="text-lg font-medium">{user?.name}</span>
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2">
                <div
                  className="px-2 py-0 text-sm rounded flex justify-between items-center mb-1"
                >
                  <p>Theme</p>
                  <ThemeToggler />
                </div>
                <Link
                  href="/settings"
                  className="block px-2 py-1 text-sm rounded hover:bg-muted"
                >
                  Settings
                </Link>
                <button
                  className="w-full text-left px-2 py-1 text-sm rounded hover:bg-muted text-red-500 cursor-pointer"
                  onClick={() => firebaseSignOut()}
                >
                  Log out
                </button>
              </PopoverContent>
            </Popover>

            <button onClick={() => {
              console.log(auth.currentUser)
              setCreateNewNote(true);
              let uuid = uuidv4()
              router.push(`/${MY_WORKSPACE}/${uuid}`);
            }} className="p-2 rounded-md hover:bg-muted cursor-pointer">
              <Edit className="h-5 w-5 text-primary" />
            </button>
          </div>
        ) :
          <div className="px-4 py-3 flex items-center justify-between border-b border-muted">
            <Skeleton className="h-6 w-3/4" />
          </div>
      }
      {/* Scrollable Pages section */}
      {
        user ?
          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
            {sidebarItems.map((item) => (
              <SidebarItemComponent itemClick={itemClick} key={item.id} item={item} />
            ))}
          </div> :
          <div className="flex-1 overflow-y-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="px-2 py-1">
                <Skeleton className="h-6 w-full mb-1" />
              </div>
            ))
            }
          </div>
      }

      {/* Footer section */}
      <div className="px-4 py-3 border-t border-muted space-y-2">
        <Link
          href="/settings"
          onClick={() => itemClick?.()}
          className="flex items-center gap-2 text-lg hover:bg-muted px-2 py-1 rounded-md"
        >
          <Settings className="h-5 w-5" />
          Settings & Members
        </Link>
        <Link
          href="/about"
          onClick={() => itemClick?.()}
          className="flex items-center gap-2 text-lg hover:bg-muted px-2 py-1 rounded-md"
        >
          <Info className="h-5 w-5" />
          About Notion
        </Link>
      </div>
    </aside>
  );
};
