/*
  Warnings:

  - Made the column `created_by` on table `news` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_by` on table `news` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "news" ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "updated_by" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
