-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "curriculum_id" INTEGER;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_curriculum_id_fkey" FOREIGN KEY ("curriculum_id") REFERENCES "curriculums"("id") ON DELETE SET NULL ON UPDATE CASCADE;
