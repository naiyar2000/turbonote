'use client';

import {
  useCreateBlockNote,
} from '@blocknote/react';
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useEffect, useRef, useState } from 'react';
import { PartialBlock } from '@blocknote/core';
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from '@/components/theme-provider';
import "./editor.css";
import { SaveIcon } from 'lucide-react';
import { socket } from "@/lib/api/socket";
import { useParams } from "next/navigation";
import debounce from "debounce";
import { isEqual } from "lodash";
import { createNote, fetchNotes, updateNote } from "@/lib/api/notes";
import { useRootStore } from '../store/rootStore';

type NoteEditorProps = {
  initialContent?: PartialBlock[] | null;
  // onSave: (content: PartialBlock[]) => void;
  // onChange: (content: PartialBlock[]) => void;
};

export default function NoteEditor({ initialContent }: NoteEditorProps) {
  const [editorReady, setEditorReady] = useState(false);
  const { createNewNote, user, setNotes } = useRootStore();
  const { theme } = useTheme();
  const params = useParams();
  const noteId = params.id as string;

  const editor = useCreateBlockNote({
    initialContent: initialContent ?? undefined,
  });

  const isRemoteUpdate = useRef(false);

  // 🧠 Track the last synced document
  const lastSyncedDocRef = useRef<PartialBlock[]>(initialContent ?? []);

  // 📡 Join the WebSocket room and receive updates
  useEffect(() => {
    socket.emit("join_room", noteId);

    socket.on("receive_update", (remoteContent: PartialBlock[]) => {
      isRemoteUpdate.current = true; // Set flag before updating editor content
      console.log("lastSyncedDocRef.current", lastSyncedDocRef.current);
      console.log("currentDoc", remoteContent);
      if (!isEqual(remoteContent, editor.document)) {
        editor.replaceBlocks(editor.document, remoteContent);
        lastSyncedDocRef.current = remoteContent; // Update last synced
        console.log("🔄 Received update from server, updated editor content.");
      }
    });

    return () => {
      socket.off("receive_update");
    };
  }, [noteId]);


  // 🧠 Debounced save only if content changed
  const debouncedSave = useRef(
    debounce(async (currentDoc: PartialBlock[]) => {
      if (!isEqual(currentDoc, lastSyncedDocRef.current)) {
        console.log("🔄 Updating note...");
        socket.emit("update_note", { noteId, content: currentDoc });
        if (createNewNote) {
          let res = await createNote({
            id: noteId,
            title: "New Note",
            contentBlocks: currentDoc,
            authorId: user?.id || "anonymous",
          })
          if(res) {
            console.log("✅ Note created successfully:", res);
            let userNotes = await fetchNotes();
            setNotes(userNotes);
          } 
        } else {
          updateNote(noteId, { contentBlocks: currentDoc });
        }
        lastSyncedDocRef.current = currentDoc;
      } else {
        console.log("✅ No changes detected, skipping update.");
      }
    }, 3000)
  ).current;

  useEffect(() => {
    if (editor) setEditorReady(true);
  }, [editor]);

  if (!editorReady) return <p>Loading editor...</p>;

  return (
    <div className="w-full h-full relative">
      <BlockNoteView
        editor={editor}
        onChange={() => {
          if (isRemoteUpdate.current) {
            isRemoteUpdate.current = false;
            return;
          }
          debouncedSave(editor.document);
        }}
        theme={theme}
        data-theming-css-variables-demo
        className="h-full w-full"
      />
    </div>
  );
}
