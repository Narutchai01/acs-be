import { UserModel } from './user';

export interface AdminModel {
  id: number;
  userId: number;
  user: UserModel;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number | null;
  updatedBy: number | null;
}
