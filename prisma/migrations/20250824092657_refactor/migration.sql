/*
  Warnings:

  - You are about to drop the column `level_en` on the `education_levels` table. All the data in the column will be lost.
  - You are about to drop the column `field_id` on the `expert_fields` table. All the data in the column will be lost.
  - You are about to drop the column `positionEn` on the `majorPosition` table. All the data in the column will be lost.
  - You are about to drop the column `positionTh` on the `majorPosition` table. All the data in the column will be lost.
  - You are about to drop the column `academicPosition` on the `professors` table. All the data in the column will be lost.
  - You are about to drop the column `majorPosition` on the `professors` table. All the data in the column will be lost.
  - Added the required column `level` to the `education_levels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `field` to the `expert_fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position_en` to the `majorPosition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position_th` to the `majorPosition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicPositionId` to the `professors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `majorPositionId` to the `professors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "expert_fields" DROP CONSTRAINT "expert_fields_field_id_fkey";

-- AlterTable
ALTER TABLE "education_levels" DROP COLUMN "level_en",
ADD COLUMN     "level" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "expert_fields" DROP COLUMN "field_id",
ADD COLUMN     "field" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "majorPosition" DROP COLUMN "positionEn",
DROP COLUMN "positionTh",
ADD COLUMN     "position_en" TEXT NOT NULL,
ADD COLUMN     "position_th" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "professors" DROP COLUMN "academicPosition",
DROP COLUMN "majorPosition",
ADD COLUMN     "academicPositionId" INTEGER NOT NULL,
ADD COLUMN     "majorPositionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "news_medias" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "news_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "news_medias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "news_medias_news_id_key" ON "news_medias"("news_id");

-- AddForeignKey
ALTER TABLE "news_medias" ADD CONSTRAINT "news_medias_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_medias" ADD CONSTRAINT "news_medias_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "list_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_medias" ADD CONSTRAINT "news_medias_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professors" ADD CONSTRAINT "professors_academicPositionId_fkey" FOREIGN KEY ("academicPositionId") REFERENCES "academic_position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professors" ADD CONSTRAINT "professors_majorPositionId_fkey" FOREIGN KEY ("majorPositionId") REFERENCES "majorPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
