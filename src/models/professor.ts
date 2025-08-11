import { BaseModel } from '.';
import { UserModel } from './user';

export interface ProfessorModel extends BaseModel {
  id: number;
  userId: number;
  academicPosition: number;
  majorPosition: number;
  profRoom: string;
  fieldOffexpertise: string;
  user: UserModel;
}

export interface UpdateProfessorModel extends BaseModel {
  userId: number;
  academicPosition: number;
  majorPosition: number;
  profRoom: string;
  fieldOffexpertise: string;
  user: UserModel;
}
