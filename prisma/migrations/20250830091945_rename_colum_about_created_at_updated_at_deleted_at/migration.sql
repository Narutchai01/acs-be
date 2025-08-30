/*
  Warnings:

  - You are about to drop the column `createdDate` on the `Example` table. All the data in the column will be lost.
  - You are about to drop the column `deletedDate` on the `Example` table. All the data in the column will be lost.
  - You are about to drop the column `updatedDate` on the `Example` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `academic_position` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `academic_position` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_date` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `curriculums` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_date` on the `curriculums` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `curriculums` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `education` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_date` on the `education` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `education` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `education_levels` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `education_levels` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `expert_fields` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_date` on the `expert_fields` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `expert_fields` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `majorPosition` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `majorPosition` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `prev_courses` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_date` on the `prev_courses` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `prev_courses` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `professors` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_date` on the `professors` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `professors` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_date` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `type_courses` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `type_courses` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `types` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `types` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_date` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_date` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Example` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `academic_position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `curriculums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `education_levels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `expert_fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `majorPosition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `prev_courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `professors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `type_courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_user_id_fkey";

-- AlterTable
ALTER TABLE "Example" DROP COLUMN "createdDate",
DROP COLUMN "deletedDate",
DROP COLUMN "updatedDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "academic_position" DROP COLUMN "created_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "curriculums" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "education" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "education_levels" DROP COLUMN "created_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "expert_fields" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "majorPosition" DROP COLUMN "created_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "news_medias" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "prev_courses" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "professors" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "type_courses" DROP COLUMN "created_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "types" DROP COLUMN "created_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user_roles" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "admins";
