/*
  Warnings:

  - You are about to drop the column `createdAt` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `types` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `types` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_roles` table. All the data in the column will be lost.
  - Added the required column `created_by` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_date` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_date` to the `types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `user_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `user_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `user_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_date` to the `user_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_userId_fkey";

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "createdAt",
DROP COLUMN "createdBy",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
DROP COLUMN "updatedBy",
ADD COLUMN     "created_by" INTEGER NOT NULL,
ADD COLUMN     "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_date" TIMESTAMP(3),
ADD COLUMN     "updated_by" INTEGER NOT NULL,
ADD COLUMN     "updated_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "deleted_date" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "types" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user_roles" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "roleId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_by" INTEGER NOT NULL,
ADD COLUMN     "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_date" TIMESTAMP(3),
ADD COLUMN     "role_id" INTEGER NOT NULL,
ADD COLUMN     "updated_by" INTEGER NOT NULL,
ADD COLUMN     "updated_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "student_id" TEXT NOT NULL,
    "linkedin" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "github" TEXT,
    "year_of_first_admission" INTEGER NOT NULL,
    "year_of_completion" INTEGER,
    "class_of" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,
    "deleted_date" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_userId_key" ON "students"("userId");

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
