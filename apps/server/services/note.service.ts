// server/services/note.service.ts
import { PrismaClient } from "@repo/db/prisma/generated/client"

const prisma = new PrismaClient();

// const prisma = new PrismaClient();
export const getAllNotesService = async () => {
  return prisma.note.findMany({ include: { attachments: true, author: true }, omit: { contentBlocks: true } });
};

export const getNoteByIdService = async (id: string) => {
  return prisma.note.findUnique({ where: { id }, include: { attachments: true } });
};

export const createNoteService = async (
  id: string,
  title: string,
  contentBlocks: object,
  tags: string[],
  authorId: string,
) => {
  return prisma.note.create({
    data: {
      title,
      id,
      contentBlocks,
      tags,
      authorId,
    },
  });
};


export const updateNoteService = async (id: string, data: any) => {
  try {
    console.log("Updating note with ID:", id, "Data:", data);
    return await prisma.note.update({
      where: { id },
      data,
    });
  } catch {
    console.error("Error updating note with ID:", id);
    return null;
  }
};

export const deleteNoteService = async (id: string) => {
  try {
    await prisma.file.deleteMany({ where: { noteId: id } }); // Delete files first
    return await prisma.note.delete({ where: { id } });
  } catch {
    return null;
  }
};
