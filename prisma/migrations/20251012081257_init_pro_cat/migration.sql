-- CreateTable
CREATE TABLE "public"."project_categories" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "list_type_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "project_categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."project_categories" ADD CONSTRAINT "project_categories_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_categories" ADD CONSTRAINT "project_categories_list_type_id_fkey" FOREIGN KEY ("list_type_id") REFERENCES "public"."list_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
