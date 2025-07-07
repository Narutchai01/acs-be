-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_type_course_id_fkey";

-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "type_course_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "curriculums" (
    "id" SERIAL NOT NULL,
    "year" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,
    "deleted_date" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "curriculums_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_type_course_id_fkey" FOREIGN KEY ("type_course_id") REFERENCES "type_courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
