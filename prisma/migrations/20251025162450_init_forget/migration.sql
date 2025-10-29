-- CreateTable
CREATE TABLE "public"."forget_password_credentials" (
    "id" SERIAL NOT NULL,
    "reference" UUID NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL DEFAULT NOW() + INTERVAL '5 minutes',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "forget_password_credentials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "forget_password_credentials_reference_key" ON "public"."forget_password_credentials"("reference");
