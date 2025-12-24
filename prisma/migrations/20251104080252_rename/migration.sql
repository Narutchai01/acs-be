/*
  Warnings:

  - You are about to drop the column `instragram` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."forget_password_credentials" ALTER COLUMN "expired_at" SET DEFAULT NOW() + INTERVAL '5 minutes';

-- AlterTable
ALTER TABLE "public"."students" DROP COLUMN "instragram",
ADD COLUMN     "instagram" TEXT;
