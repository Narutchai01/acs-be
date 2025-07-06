-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "type_course_id" INTEGER;

-- CreateTable
CREATE TABLE "type_courses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "type_courses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "type_courses_name_key" ON "type_courses"("name");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_type_course_id_fkey" FOREIGN KEY ("type_course_id") REFERENCES "type_courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
