import { CourseModel } from './course';
import { BaseModel } from '.';

export interface CreatePrevCourseModel {
  courseId: number;
  prevCourseId: number;
  createdBy: number;
  updatedBy: number;
}

export interface PrevCourseModel extends BaseModel {
  id: number;
  courseId: number;
  prevCourseId: number;
  PrevCourse?: CourseModel | null;
  Course?: CourseModel | null;
}
