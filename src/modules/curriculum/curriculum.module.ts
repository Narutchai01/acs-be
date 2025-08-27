import { Module } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CurriculumController } from './curriculum.controller';
import { CurriculumFactory } from './curriculum.factory';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { SupabaseModule } from 'src/provider/store/supabase/supabase.module';

@Module({
  imports: [RepositoriesModule, SupabaseModule],
  controllers: [CurriculumController],
  providers: [CurriculumService, CurriculumFactory],
  exports: [CurriculumService],
})
export class CurriculumModule {}
