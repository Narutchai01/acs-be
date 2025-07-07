import { UserModel } from './user';
import { BaseModel } from '.';

export interface CreateCourseModel {
  courseId: string;
  courseNameTh: string;
  courseNameEn: string;
  typeCourseId: number;
  credits: string;
  courseDetail: string;
  createdBy: number;
  updatedBy: number;
}

export interface UpdateCourseModel extends BaseModel {
  courseId: string;
  typeCourseId: number;
  courseNameTh: string;
  courseNameEn: string;
  credits: string;
  courseDetail: string;
}

export interface CourseModel extends BaseModel {
  id: number;
  courseId: string;
  typeCourseId: number | null;
  courseNameTh: string;
  courseNameEn: string;
  credits: string;
  courseDetail: string;
  user: UserModel;
}

export interface TypeCourseModel extends BaseModel {
  id: number;
  name: string;
  description: string;
}
