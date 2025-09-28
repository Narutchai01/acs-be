/*
  Warnings:

  - A unique constraint covering the columns `[classof]` on the table `class_books` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "class_books_classof_key" ON "public"."class_books"("classof");
