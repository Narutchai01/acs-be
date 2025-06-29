/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Example` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Example` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Example` table. All the data in the column will be lost.
  - Added the required column `updatedDate` to the `Example` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Example" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedDate" TIMESTAMP(3),
ADD COLUMN     "updatedDate" TIMESTAMP(3) NOT NULL;
