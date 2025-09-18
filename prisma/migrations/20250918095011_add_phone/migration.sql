/*
  Warnings:

  - You are about to drop the column `profRoom` on the `professors` table. All the data in the column will be lost.
  - Added the required column `phone` to the `professors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prof_room` to the `professors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."professors" DROP COLUMN "profRoom",
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "prof_room" TEXT NOT NULL;
