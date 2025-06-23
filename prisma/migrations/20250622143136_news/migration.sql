/*
  Warnings:

  - You are about to drop the column `DeletedAt` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `userRoleId` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `list_types` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `list_types` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `list_types` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `DeletedAt` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstNameEn` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstNameTh` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastNameEn` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastNameTh` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nickName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `list_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `list_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name_th` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name_th` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_userRoleId_fkey";

-- DropForeignKey
ALTER TABLE "list_types" DROP CONSTRAINT "list_types_typeId_fkey";

-- DropIndex
DROP INDEX "admins_userRoleId_key";

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "DeletedAt",
DROP COLUMN "userRoleId",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "list_types" DROP COLUMN "createdAt",
DROP COLUMN "typeId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user_roles" DROP COLUMN "DeletedAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdBy",
DROP COLUMN "deletedAt",
DROP COLUMN "firstNameEn",
DROP COLUMN "firstNameTh",
DROP COLUMN "imageUrl",
DROP COLUMN "lastNameEn",
DROP COLUMN "lastNameTh",
DROP COLUMN "nickName",
DROP COLUMN "updatedBy",
ADD COLUMN     "created_by" INTEGER,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "first_name_en" TEXT,
ADD COLUMN     "first_name_th" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "last_name_en" TEXT,
ADD COLUMN     "last_name_th" TEXT NOT NULL,
ADD COLUMN     "nick_name" TEXT,
ADD COLUMN     "updated_by" INTEGER;

-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" INTEGER,
    "updated_by" INTEGER,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_user_id_key" ON "admins"("user_id");

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_types" ADD CONSTRAINT "list_types_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
