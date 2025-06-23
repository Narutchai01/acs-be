-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "list_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
