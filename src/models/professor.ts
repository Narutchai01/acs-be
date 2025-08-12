import { BaseModel } from '.';
import { UserModel } from './user';

export interface ProfessorModel extends BaseModel {
  id: number;
  userId: number;
  academicPosition: number;
  majorPosition: number;
  profRoom: string;
  fieldOfExpertise: string;
  user: UserModel;
}

export interface CreateProfessorModel {
  userId: number;
  academicPosition: number;
  majorPosition: number;
  profRoom: string;
  fieldOfExpertise: string;
}
