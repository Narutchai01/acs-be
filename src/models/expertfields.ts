import { BaseModel } from '.';
import { ProfessorModel } from './professor';
import { ListTypeModel } from './type';

export interface ExpertFieldModel extends BaseModel {
  id: number;
  professorId: number;
  fieldId: number;
  professor?: ProfessorModel;
  field?: ListTypeModel;
}
export interface CreateExpertField {
  professorId: number;
  fieldId: number;
}
