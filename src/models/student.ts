import { BaseModel } from '.';
import { ClassBookModel } from './class-book';
import { UserModel } from './user';

export interface StudentModel extends BaseModel {
  id: number;
  userId: number;
  studentId: string;
  linkedin?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  github?: string | null;
  user?: UserModel;
  classBook?: ClassBookModel;
}

export interface RequestStudentModel {
  userId: number;
  studentId: string;
  linkedin?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  github?: string | null;
  classBookId: number;
  createdBy: number;
  updatedBy: number;
}
