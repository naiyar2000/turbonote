// server/services/note.service.ts
import { Note, PrismaClient } from "@repo/db/prisma/generated/client"
import { esClient } from "../lib/elastic";

const prisma = new PrismaClient();

type ContentBlock = {
  type: string;
  props: Record<string, any>;
  content: {
    text: string;
    type: string;
    styles: Record<string, any>;
  }[];
  children: ContentBlock[];
};

export function flattenNoteBlocks(blocks: ContentBlock[]): string {
  return blocks
    .map((block) => {
      const inner = block.content.map((c) => c.text).join(' ');
      const children = block.children ? flattenNoteBlocks(block.children) : '';
      return `${inner} ${children}`;
    })
    .join('\n');
}


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
  let note = await prisma.note.create({
    data: {
      title,
      id,
      contentBlocks,
      tags,
      authorId,
    },
  });


  addUpdateNoteSearchIndex(note);

  return note;
};


export const updateNoteService = async (id: string, data: any) => {
  try {
    let updatedNote = await prisma.note.update({
      where: { id },
      data,
    });

    addUpdateNoteSearchIndex(updatedNote);
    return updatedNote;
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


export const searchNoteService = async (q: string, userId: string) => {
  if (!q || !userId) return null
  const result = await esClient.search({
    index: 'notes',
    query: {
      bool: {
        must: [
          {
            match: {
              flattenedText: {
                query: q,
                operator: 'and',
              },
            },
          },
          {
            match: {
              userId,
            },
          },
        ],
      },
    },
    highlight: {
      fields: {
        flattenedText: {},
      },
    },
  });

  const notes = result.hits.hits.map((hit: any) => ({
    id: hit._id,
    title: hit._source.title,
    tags: hit._source.tags,
    snippet: hit.highlight?.flattenedText?.[0] || '',
  }));
  console.log(notes)

  return notes;
}


const addUpdateNoteSearchIndex = async (note: Note) => {
  const contentBlocksArray: ContentBlock[] =
    typeof note.contentBlocks === "string"
      ? JSON.parse(note.contentBlocks)
      : (note.contentBlocks as ContentBlock[]);
  const flatText = flattenNoteBlocks(contentBlocksArray);

  await esClient.index({
    index: 'notes',
    id: note.id,
    document: {
      title: note.title,
      tags: note.tags,
      userId: note.authorId,
      flattenedText: flatText,
      // contentBlocks: note.contentBlocks, // Optional: if you want to reference in highlight
    },
  });
}