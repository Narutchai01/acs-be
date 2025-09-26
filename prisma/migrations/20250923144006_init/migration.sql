/*
  Warnings:

  - You are about to drop the column `class_of` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `year_of_completion` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `year_of_first_admission` on the `students` table. All the data in the column will be lost.
  - You are about to drop the `ClassBook` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `class_book_id` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."students" DROP CONSTRAINT "students_userId_fkey";

-- DropIndex
DROP INDEX "public"."students_userId_key";

-- AlterTable
ALTER TABLE "public"."students" DROP COLUMN "class_of",
DROP COLUMN "instagram",
DROP COLUMN "linkedin",
DROP COLUMN "userId",
DROP COLUMN "year_of_completion",
DROP COLUMN "year_of_first_admission",
ADD COLUMN     "class_book_id" INTEGER NOT NULL,
ADD COLUMN     "instragram" TEXT,
ADD COLUMN     "linkin" TEXT,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."ClassBook";

-- CreateTable
CREATE TABLE "public"."class_books" (
    "id" SERIAL NOT NULL,
    "classof" INTEGER NOT NULL,
    "first_year_academic" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "class_books_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."students" ADD CONSTRAINT "students_class_book_id_fkey" FOREIGN KEY ("class_book_id") REFERENCES "public"."class_books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
