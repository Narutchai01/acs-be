import { BaseModel } from '.';
import { UserModel } from './user';

export interface RoleModel {
  id: number;
  name: string;
}

export interface UserRoleModel extends BaseModel {
  id: number;
  userId: number;
  roleId: number;
  role: RoleModel;
  user: UserModel;
}
