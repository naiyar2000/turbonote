/*
  Warnings:

  - You are about to drop the column `content` on the `Note` table. All the data in the column will be lost.
  - Added the required column `contentBlocks` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "content",
ADD COLUMN     "contentBlocks" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "SharedAccess" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "noteId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "SharedAccess_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SharedAccess" ADD CONSTRAINT "SharedAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedAccess" ADD CONSTRAINT "SharedAccess_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
