import { BaseModel } from '.';
import { UserModel } from './user';
import { CourseModel } from './course';

export interface ProfessorModel extends BaseModel {
  id: number;
  userId: number;
  academicPosition: number;
  majorPosition: number;
  profRoom: string;
  fieldOffexpertise: string;
  user: UserModel;
}

export interface UpdateProfessorModel extends BaseModel {
  userId: number;
  academicPosition: number;
  majorPosition: number;
  profRoom: string;
  fieldOffexpertise: string;
  updatedBy: number;
}

export interface CreateProfessorModel extends BaseModel {
  userId: number;
  academicPosition: number;
  majorPosition: number;
  profRoom: string;
  fieldOffexpertise: string;
  createDate: Date;
  createdBy: number;
  updatedBy: number;
}

export interface TeachingAssignmentModel extends BaseModel {
  id: number;
  professorId: number;
  courseId: number;
  semesterId: number;
  academicYearId: number;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
  createdBy: number;
  updatedBy: number;
  professor?: ProfessorModel | null;
  course: CourseModel;
  user?: UserModel | null;
}
