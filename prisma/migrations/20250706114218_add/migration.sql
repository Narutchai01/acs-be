/*
  Warnings:

  - You are about to drop the column `course_name` on the `courses` table. All the data in the column will be lost.
  - Added the required column `course_name_en` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_name_th` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credits` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "course_name",
ADD COLUMN     "course_name_en" TEXT NOT NULL,
ADD COLUMN     "course_name_th" TEXT NOT NULL,
ADD COLUMN     "credits" TEXT NOT NULL;
