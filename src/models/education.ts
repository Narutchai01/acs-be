import { ProfessorModel } from './professor';
import { EducationLevelModel } from './educationlavel';

export interface EducationModel {
  id: number;
  levelId: number;
  professorId: number;
  education: string;
  university: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
  updatedBy: number;
  createdBy: number;
  professor?: ProfessorModel | null;
  educationLevel: EducationLevelModel;
}

export interface CreateEducationModel {
  professorId: number;
  education: string;
  levelId: number;
  university: string;
  createdBy: number;
  updatedBy: number;
}
