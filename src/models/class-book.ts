import { BaseModel } from '.';
import { StudentModel } from './student';

export interface ClassBookModel extends BaseModel {
  id: number;
  classof: number;
  firstYearAcademic: string;
  image: string;
  curriculumId: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  createdBy: number;
  updatedBy: number;
  student?: StudentModel[];
}

export interface RequestClassBookModel {
  classof: number;
  firstYearAcademic: string;
  image: string;
  curriculumId: number;
}

export interface UpdateClassBookModel {
  classof?: number;
  firstYearAcademic?: string;
  image?: string;
  curriculumId?: number;
  updatedBy: number;
}
