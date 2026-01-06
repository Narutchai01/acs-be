/*
  Warnings:

  - Added the required column `title` to the `curriculums` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."curriculums" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."forget_password_credentials" ALTER COLUMN "expired_at" SET DEFAULT NOW() + INTERVAL '5 minutes';

-- CreateTable
CREATE TABLE "public"."project_type" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "list_type_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "project_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."project_type" ADD CONSTRAINT "project_type_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_type" ADD CONSTRAINT "project_type_list_type_id_fkey" FOREIGN KEY ("list_type_id") REFERENCES "public"."list_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
