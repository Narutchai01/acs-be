import { BaseModel } from '.';
import { ProfessorModel } from './professor';

export interface ExpertFieldModel extends BaseModel {
  id: number;
  professorId: number;
  field: string;
  professor?: ProfessorModel;
}
export interface CreateExpertField {
  professorId: number;
  field: string;
}

export interface IUpdateExpertField {
  id: number;
  field: string;
}
