import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { SupabaseModule } from 'src/provider/store/supabase/supabase.module';

@Module({
  imports: [RepositoriesModule, SupabaseModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
