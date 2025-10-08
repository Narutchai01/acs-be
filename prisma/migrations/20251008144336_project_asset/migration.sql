-- CreateTable
CREATE TABLE "public"."project_assets" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "asset" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "project_assets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."project_assets" ADD CONSTRAINT "project_assets_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
