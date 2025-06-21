/*
  Warnings:

  - The primary key for the `Note` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `noteId` on the `Note` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_noteId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_noteId_fkey";

-- DropForeignKey
ALTER TABLE "SharedAccess" DROP CONSTRAINT "SharedAccess_noteId_fkey";

-- DropIndex
DROP INDEX "Note_noteId_key";

-- AlterTable
ALTER TABLE "Favorite" ALTER COLUMN "noteId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "noteId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Note" DROP CONSTRAINT "Note_pkey",
DROP COLUMN "noteId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Note_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Note_id_seq";

-- AlterTable
ALTER TABLE "SharedAccess" ALTER COLUMN "noteId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedAccess" ADD CONSTRAINT "SharedAccess_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
