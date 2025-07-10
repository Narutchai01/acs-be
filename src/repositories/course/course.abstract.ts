import { Injectable } from '@nestjs/common';
import {
  CourseModel,
  CreateCourseModel,
  UpdateCourseModel,
} from 'src/models/course';
import { QueryCourseDto } from 'src/modules/course/dto/get-course.dto';

@Injectable()
export abstract class ICourseRepository {
  constructor() {}
  abstract getCourse(query: QueryCourseDto): Promise<CourseModel[]>;
  abstract getCourseById(id: number): Promise<CourseModel>;
  abstract createCourse(data: CreateCourseModel): Promise<CourseModel>;
  abstract updateCourse(
    id: number,
    data: UpdateCourseModel,
  ): Promise<CourseModel>;
  abstract deleteCourse(id: number, userId: number): Promise<CourseModel>;
  abstract count(): Promise<number>;
}
