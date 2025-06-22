import { StateCreator } from "zustand";
import { PortfolioStore } from "./rootStore";

type ContentBlock = {
    id: string;
    type: string;
    props: {
        textColor: string;
        textAlignment: string;
        backgroundColor: string;
    };
    content: Array<{
        text: string;
        type: string;
        styles: Record<string, unknown>;
    }>;
    children: ContentBlock[];
};

type Note = {
    id: string;
    title: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    authorId: string;
    contentBlocks: ContentBlock[];
    attachments: unknown[];
};

export type NotesStore = {
    createNewNote: boolean;
    setCreateNewNote: (createNewNote: boolean) => void;
    notes: Note[];
    selectedNote?: {
        id: string;
        title: string;
        contentBlocks?: ContentBlock[];
    },
    loading: boolean;
    setSelectedNote: (note?: { id: string; title: string; contentBlocks?: ContentBlock[] }) => void;
    setNotesLoading: (loading: boolean) => void;
    setNotes: (notes: Note[]) => void;
};

export const createNoteSlice: StateCreator<
    PortfolioStore,
    [['zustand/devtools', never]],
    [],
    NotesStore
> = (set) => ({
    notes: [],
    loading: true,
    selectedNote: undefined,
    createNewNote: false,
    setCreateNewNote: (createNewNote) => set({ createNewNote: createNewNote }),
    setSelectedNote: (note) => set({ selectedNote: note }),
    setNotesLoading: (loading) => set({ loading: loading }),
    setNotes: (notes) => set({ notes: notes, loading: false }),
});