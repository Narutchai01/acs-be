import { BaseModel } from '.';
import { ProfessorModel } from './professor';
import { ListTypeModel } from './type';

export interface ExpertFields extends BaseModel {
  id: number;
  professorId: number;
  fieldId: number;
  professor?: ProfessorModel;
  field?: ListTypeModel;
}
