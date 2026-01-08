/*
  Warnings:

  - You are about to drop the column `refreshTokenId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."forget_password_credentials" ALTER COLUMN "expired_at" SET DEFAULT NOW() + INTERVAL '5 minutes';

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "refreshTokenId";
