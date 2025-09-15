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
ALTER TABLE "public"."admins" DROP CONSTRAINT "admins_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."Example" DROP COLUMN "createdDate",
DROP COLUMN "deletedDate",
DROP COLUMN "updatedDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."academic_position" DROP COLUMN "created_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."courses" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."curriculums" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."education" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."education_levels" DROP COLUMN "created_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."expert_fields" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."majorPosition" DROP COLUMN "created_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."news_medias" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."prev_courses" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."professors" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."students" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."type_courses" DROP COLUMN "created_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."types" DROP COLUMN "created_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."user_roles" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "created_date",
DROP COLUMN "deleted_date",
DROP COLUMN "updated_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."admins";
