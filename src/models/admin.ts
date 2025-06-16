import { UserRoleModel } from './role';

export interface AdminModel {
  id: number;
  userRoleId: UserRoleModel;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number | null;
  updatedBy: number | null;
}
