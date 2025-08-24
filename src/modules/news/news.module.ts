import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { SupabaseModule } from 'src/provider/store/supabase/supabase.module';
import { NewsFactory } from './news.factory';
import { TypeFactory } from '../type/type.factory';

@Module({
  imports: [RepositoriesModule, SupabaseModule],
  controllers: [NewsController],
  providers: [NewsService, NewsFactory, TypeFactory],
})
export class NewsModule {}
