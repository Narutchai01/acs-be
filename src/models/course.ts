import { UserModel } from './user';
import { BaseModel } from '.';

export interface CreateCourseModel {
  courseName: string;
  courseDetail: string;
  createdBy: number;
  updatedBy: number;
}

export interface UpdateCourseModel {
  courseName: string;
  courseDetail: string;
}

export interface CourseModel extends BaseModel {
  id: number;
  courseId: string;
  courseName: string;
  courseDetail: string;
  user: UserModel;
}
