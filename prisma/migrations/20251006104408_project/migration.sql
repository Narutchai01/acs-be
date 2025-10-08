/*
  Warnings:

  - You are about to drop the `project_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_fields` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_members` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."project_categories" DROP CONSTRAINT "project_categories_list_type_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_categories" DROP CONSTRAINT "project_categories_project_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_fields" DROP CONSTRAINT "project_fields_list_type_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_fields" DROP CONSTRAINT "project_fields_project_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_members" DROP CONSTRAINT "project_members_project_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_members" DROP CONSTRAINT "project_members_studentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_members" DROP CONSTRAINT "project_members_user_id_fkey";

-- DropTable
DROP TABLE "public"."project_categories";

-- DropTable
DROP TABLE "public"."project_fields";

-- DropTable
DROP TABLE "public"."project_members";
