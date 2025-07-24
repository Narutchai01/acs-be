import { UserModel } from './user';
import { BaseModel } from '.';
import { CurriculumModel } from './curriculum';
import { PrevCourseModel } from './prevcourse';

export interface CreateCourseModel {
  courseId: string;
  curriculumId: number;
  courseNameTh: string;
  courseNameEn: string;
  typeCourseId: number | null;
  credits: string;
  courseDetail: string;
  createdBy: number;
  updatedBy: number;
}

export interface UpdateCourseModel extends BaseModel {
  courseId: string;
  curriculumId?: number | null;
  typeCourseId: number | null;
  courseNameTh: string;
  courseNameEn: string;
  credits: string;
  courseDetail: string;
}

export interface CourseModel extends BaseModel {
  id: number;
  courseId: string;
  curriculumId?: number | null;
  typeCourseId: number | null;
  courseNameTh: string;
  courseNameEn: string;
  credits: string;
  courseDetail: string;
  curriculum?: CurriculumModel | null;
  user?: UserModel | null;
  PrevCourse: PrevCourseModel[];
  PrereqisiteFor: PrevCourseModel[];
}

export interface TypeCourseModel extends BaseModel {
  id: number;
  name: string;
  description: string;
}
