import { ProfessorModel } from './professor';
import { EducationLevelModel } from './educationlavel';
import { BaseModel } from '.';

export interface EducationModel extends BaseModel {
  id: number;
  levelId: number;
  professorId: number;
  education: string;
  university: string;
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
