/*
  Warnings:

  - Made the column `type_course_id` on table `courses` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_type_course_id_fkey";

-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "type_course_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_type_course_id_fkey" FOREIGN KEY ("type_course_id") REFERENCES "type_courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
