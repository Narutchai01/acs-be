import { CourseModel } from './course';

export interface CreateCurriculumModel {
  year: string;
  fileUrl: string;
  description: string;
  createdBy: number;
  updatedBy: number;
}

export interface CurriculumModel {
  id: number;
  year: string;
  fileUrl: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
  createdBy: number;
  updatedBy: number;
  courses: CourseModel[];
}
