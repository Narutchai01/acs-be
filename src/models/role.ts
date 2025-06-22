import { UserModel } from './user';

export interface RoleModel {
  id: number;
  name: string;
}

export interface UserRoleModel {
  id: number;
  userId: number;
  roleId: number;
  role: RoleModel;
  user: UserModel;
  createdAt: Date;
  updatedAt: Date;
}
