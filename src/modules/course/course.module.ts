import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { CourseFactory } from './course.factory';
@Module({
  imports: [RepositoriesModule],
  controllers: [CourseController],
  providers: [CourseService, CourseFactory],
})
export class CourseModule { }
