/*
  Warnings:

  - You are about to drop the column `created_by` on the `expert_fields` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `expert_fields` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "expert_fields" DROP COLUMN "created_by",
DROP COLUMN "updated_by";
