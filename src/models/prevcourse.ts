import { CourseModel } from './course';
import { BaseModel } from '.';

export interface CreatePrevCourseModel extends BaseModel {
  courseId: number;
  prevCourseId: number;
  createDate: Date;
  updateDate: Date;
  createBy: number;
  updateBy: number;
}

export interface PrevCourseModel extends BaseModel {
  id: number;
  courseId: number;
  prevCourseId: number;
  PrevCourse: CourseModel;
  Course: CourseModel;
}
