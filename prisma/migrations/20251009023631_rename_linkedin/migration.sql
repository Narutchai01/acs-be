/*
  Warnings:

  - You are about to drop the column `linkin` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."students" DROP COLUMN "linkin",
ADD COLUMN     "linkedin" TEXT;
