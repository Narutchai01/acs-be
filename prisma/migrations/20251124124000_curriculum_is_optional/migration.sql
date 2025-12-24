-- DropForeignKey
ALTER TABLE "public"."class_books" DROP CONSTRAINT "class_books_curriculum_id_fkey";

-- AlterTable
ALTER TABLE "public"."class_books" ALTER COLUMN "curriculum_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."forget_password_credentials" ALTER COLUMN "expired_at" SET DEFAULT NOW() + INTERVAL '5 minutes';

-- AddForeignKey
ALTER TABLE "public"."class_books" ADD CONSTRAINT "class_books_curriculum_id_fkey" FOREIGN KEY ("curriculum_id") REFERENCES "public"."curriculums"("id") ON DELETE SET NULL ON UPDATE CASCADE;
