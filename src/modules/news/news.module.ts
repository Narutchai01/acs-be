import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { SupabaseModule } from 'src/provider/store/supabase/supabase.module';
import { NewsFactory } from './news.factory';
import { MasterDataFactoryV1 } from '../masterdata/masterdata.factory.v1';

@Module({
  imports: [RepositoriesModule, SupabaseModule],
  controllers: [NewsController],
  providers: [NewsService, NewsFactory, MasterDataFactoryV1],
})
export class NewsModule {}
