import { BaseModel } from '.';
import { ProfessorModel } from './professor';

export interface ExpertFieldModel extends BaseModel {
  id: number;
  professorId: number;
  field: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
  professor?: ProfessorModel;
}
export interface CreateExpertField {
  professorId: number;
  field: string;
}
