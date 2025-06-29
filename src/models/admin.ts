import { BaseModel } from '.';
import { UserModel } from './user';

export interface AdminModel extends BaseModel {
  id: number;
  userId: number;
  user: UserModel;
}
