import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { SupabaseModule } from 'src/provider/store/supabase/supabase.module';
import { StudentsModule } from '../students/students.module';
import { ProjectFactory } from './project.factory';

@Module({
  imports: [RepositoriesModule, SupabaseModule, StudentsModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectFactory],
})
export class ProjectModule {}
