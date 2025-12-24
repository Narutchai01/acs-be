import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { SupabaseModule } from 'src/provider/store/supabase/supabase.module';
import { StudentsModule } from '../students/students.module';
import { ProjectFactory } from './project.factory';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [RepositoriesModule, SupabaseModule, StudentsModule, CourseModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectFactory],
})
export class ProjectModule {}
