/*
  Warnings:

  - Added the required column `curriculum_id` to the `class_books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."class_books" ADD COLUMN     "curriculum_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."forget_password_credentials" ALTER COLUMN "expired_at" SET DEFAULT NOW() + INTERVAL '5 minutes';

-- AddForeignKey
ALTER TABLE "public"."class_books" ADD CONSTRAINT "class_books_curriculum_id_fkey" FOREIGN KEY ("curriculum_id") REFERENCES "public"."curriculums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
