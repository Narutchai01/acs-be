-- CreateTable
CREATE TABLE "prev_courses" (
    "id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,
    "prev_course_id" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,
    "deleted_date" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "prev_courses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "prev_courses" ADD CONSTRAINT "prev_courses_prev_course_id_fkey" FOREIGN KEY ("prev_course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prev_courses" ADD CONSTRAINT "prev_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
