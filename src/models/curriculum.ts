import { CourseModel } from './course';
import { BaseModel } from '.';

export interface CreateCurriculumModel {
  year: string;
  fileUrl: string;
  imageUrl: string;
  description: string;
  createdBy: number;
  updatedBy: number;
}

export interface CurriculumModel extends BaseModel {
  id: number;
  year: string;
  fileUrl: string;
  imageUrl: string;
  description: string;
  courses: CourseModel[];
}

export interface UpdateCurriculumModel {
  year: string;
  fileUrl: string;
  imageUrl: string;
  description: string;
  updatedBy: number;
}
