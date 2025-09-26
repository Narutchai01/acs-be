-- CreateTable
CREATE TABLE "public"."ClassBook" (
    "id" SERIAL NOT NULL,
    "classof" INTEGER NOT NULL,
    "first_year_academic" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "ClassBook_pkey" PRIMARY KEY ("id")
);
