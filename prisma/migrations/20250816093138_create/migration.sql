-- CreateTable
CREATE TABLE "majorPosition" (
    "id" SERIAL NOT NULL,
    "positionTh" TEXT NOT NULL,
    "positionEn" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "majorPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert_fields" (
    "id" SERIAL NOT NULL,
    "professor_id" INTEGER NOT NULL,
    "field_id" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,
    "deleted_date" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "expert_fields_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "expert_fields" ADD CONSTRAINT "expert_fields_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_fields" ADD CONSTRAINT "expert_fields_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "list_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
