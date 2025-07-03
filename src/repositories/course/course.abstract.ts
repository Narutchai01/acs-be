import { Injectable } from '@nestjs/common';
import { CourseModel, CreateCourseModel } from 'src/models/course';

@Injectable()
export abstract class ICourseRepository {
  constructor() {}
 
  abstract getCourse(): Promise<CourseModel[]>; 
  abstract getCourseById(id: number): Promise<CourseModel>;
  abstract createCourse(data: CreateCourseModel): Promise<CourseModel>;
  // abstract updateCourse(id: number, data: UpdateCourseModel): Promise<CourseModel>;
  // abstract deleteCourse(id: number, userId: number): Promise<CourseModel>;
}
