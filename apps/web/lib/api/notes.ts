import { deleteWrapper, fetchWrapper, postWrapper, putWrapper } from "@/app/api";
import { toast } from "sonner";

export const fetchNotes = async () => {
    const response = await fetchWrapper(`/api/notes`);

    if (!response) {
        throw new Error("Failed to fetch notes");
    }

    return response;
};

export const fetchNoteById = async (id: string) => {

    const response = await fetchWrapper(`/api/notes/${id}`);
    console.log("Fetched Note:", response);

    if (!response) {
        throw new Error("Failed to fetch note");
    }
    if (response.status === 404) {
        return null;
    }
    return response;
};

export const updateNote = async (id: string, payload: { title?: string, contentBlocks?: any }) => {
    const response = await putWrapper(`/api/notes/${id}`, payload);

    if (!response) {
        throw new Error("Failed to update note");
    } else {
        if (payload.contentBlocks) {
            toast.success("Note updated successfully");
        } else {
            toast.success("Note title updated successfully");
        }
    }

    return response;
}

export const createNote = async (payload: { id: string, title: string, contentBlocks: any, authorId: string }) => {
    const response = await postWrapper(`/api/notes`, payload);

    if (!response) {
        throw new Error("Failed to create note");
    } else {
        toast.success("Note created successfully");
    }


    return response;
}

export const deleteNote = async (id: string) => {
    const response = await deleteWrapper(`/api/notes/${id}`);

    if (!response) {
        throw new Error("Failed to delete note");
    }

    return response;
};