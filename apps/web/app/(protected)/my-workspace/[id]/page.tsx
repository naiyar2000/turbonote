"use client";
import Editor from '@/app/component/Editor'
import { useRootStore } from '@/app/store/rootStore';
import { Skeleton } from '@/components/ui/skeleton';
import { createNote, fetchNoteById, updateNote } from '@/lib/api/notes'
import { PartialBlock } from '@blocknote/core';
import { SaveIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const HomePage = () => {
    const { notes, user, loading, setNotesLoading, setSelectedNote, selectedNote, createNewNote, setCreateNewNote } = useRootStore();
    const params = useParams()
    const id = params.id as string


    const handleSave = async (content: PartialBlock[]) => {
        try {
            if (id === "new") {
                const newNote = await createNote({
                    id: id,
                    title: "New Note",
                    contentBlocks: content,
                    authorId: user?.id || "",
                });
                console.log("Note created successfully:", newNote);
            } else {
                const updatedNote = await updateNote(id, {
                    title: selectedNote?.title || "Updated Note",
                    contentBlocks: content,
                });
                console.log("Note updated successfully:", updatedNote);
            }
        } catch (error) {
            console.error("Error creating note:", error);
        }
    }

    const fetchNotesDetails = async () => {
        try {
            setNotesLoading(true);
            let noteId = id ? id : notes?.[0]?.id;
            if (noteId === undefined) {
                console.error("No note ID found to fetch details.");
                setNotesLoading(false);
                return;
            }
            const note = await fetchNoteById(noteId);
            console.log("Fetched Note:", note);
            if (note) {
                setCreateNewNote(false);
                setSelectedNote({
                    id: note.id,
                    title: note.title,
                    contentBlocks: note.contentBlocks,
                });
                setNotesLoading(false);
            } else {
                setSelectedNote({
                    id: noteId,
                    title: "New Note",
                    contentBlocks: undefined,
                });
                setNotesLoading(false);
                setCreateNewNote(true);
                toast.error("Note not found. Please create a new note.");
            }
        } catch (error) {
            setNotesLoading(false);
            console.error("Error fetching note:", error);
        }
    }

    useEffect(() => {
        if (!notes || notes.length === 0) {
            console.log("No notes available, fetching...");
        } else {
            fetchNotesDetails();
        }
    }, [notes])
    const [saveStatus, setSaveStatus] = useState<"saving" | "saved" | "unsaved">("unsaved");

    const noteData = notes?.find(note => note.id === id);
    const noteTitle = noteData?.title || "New Note";
    const authorName = user?.name || "Unknown Author";
    const lastUpdated = noteData?.updatedAt ? new Date(noteData.updatedAt).toLocaleString() : "Never";
    return (
        <div className="flex flex-col h-full md:pt-0 pt-12">
            {/* Sticky Editor Header */}
            {!loading && (
                <header className="sticky top-0 z-10 md:flex justify-between items-center border-b bg-background px-4 sm:px-6 py-2 sm:py-3">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold">{noteTitle}</h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            by <span className="font-medium">{authorName}</span>
                            {lastUpdated && ` • Last updated ${lastUpdated}`}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        {saveStatus === "saving" && (
                            <span className="text-yellow-500 animate-pulse">Saving...</span>
                        )}
                        {saveStatus === "saved" && (
                            <span className="text-green-600">Saved</span>
                        )}
                        {saveStatus === "unsaved" && (
                            <span className="text-red-500">Unsaved</span>
                        )}
                        <SaveIcon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    </div>
                </header>
            )}

            {/* Main Editor Body */}
            <main className="flex-1 overflow-y-auto py-4 p-0 md:p-4 min-h-0">
                {loading ? (
                    <div className="flex flex-col gap-4 px-4">
                        <Skeleton className="h-10 w-2xl" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ) : notes?.length === 0 && !createNewNote ? (
                    <p className="text-center text-muted-foreground">
                        No notes available. Start creating your first note!
                    </p>
                ) : (
                    <Editor
                        initialContent={createNewNote ? undefined : selectedNote?.contentBlocks as PartialBlock[]}
                    />
                )}
            </main>
        </div>
    );
}

export default HomePage
