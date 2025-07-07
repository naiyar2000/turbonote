// server/controllers/note.controller.ts
import { Request, Response } from "express";
import {
  createNoteService,
  getAllNotesService,
  getNoteByIdService,
  updateNoteService,
  deleteNoteService,
  searchNoteService,
} from "../services/note.service";

// GET /api/notes
export const getAllNotes = async (_req: Request, res: Response) => {
  const notes = await getAllNotesService();
  res.json(notes);
};

// GET /api/notes/:id
export const getNoteById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const note = await getNoteByIdService(id);
  if (!note) return res.status(404).json({ message: "Note not found" });

  res.json(note);
};

// POST /api/notes
export const createNote = async (req: Request, res: Response) => {
  const { title, contentBlocks, tags, authorId, id } = req.body;
  if (!title || !contentBlocks) return res.status(400).json({ error: "Missing fields" });
  const newNote = await createNoteService(id, title, contentBlocks, tags || [], authorId);
  res.status(201).json(newNote);
};

// PUT /api/notes/:id
export const updateNote = async (req: Request, res: Response) => {
  const id = req.params.id;

  const updated = await updateNoteService(id, req.body);
  if (!updated) return res.status(404).json({ message: "Note not found or update failed" });

  res.json(updated);
};

// DELETE /api/notes/:id
export const deleteNote = async (req: Request, res: Response) => {
  const id = req.params.id;
  
  const deleted = await deleteNoteService(id);
  if (!deleted) return res.status(404).json({ message: "Note not found or delete failed" });

  res.json({ message: "Deleted successfully" });
};

// Search /api/notes/search?q=&userId=
export const searchNote = async(req: Request, res: Response) => {
    const {q, userId} = req.query

    const response = await searchNoteService("meili", q as string, userId as string);

    if(!response) return res.status(404).json({message: "No notes found"});

    res.json(response);
}
