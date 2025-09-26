/*
  Warnings:

  - Added the required column `image` to the `class_books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."class_books" ADD COLUMN     "image" TEXT NOT NULL;
