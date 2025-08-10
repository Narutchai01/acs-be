import { BaseModel } from '.';
import { UserModel } from './user';

export interface ProfesorModel extends BaseModel {
  id: number;
  userId: number;
  academicPosition: number;
  majorPosition: number;
  profRoom: string;
  fieldOffexpertise: string;
  user: UserModel;
}
