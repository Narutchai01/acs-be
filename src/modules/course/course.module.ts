import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { CourseFactory } from './course.factory';
import { CurriculumFactory } from '../curriculum/curriculum.factory';
@Module({
  imports: [RepositoriesModule],
  controllers: [CourseController],
  providers: [CourseService, CourseFactory, CurriculumFactory],
  exports: [CourseService, CourseFactory],
})
export class CourseModule {}
