import { UserRoleModel } from './role';
export interface UserModel {
  id: number;
  firstNameTh: string;
  lastNameTh: string;
  firstNameEn: string | null;
  lastNameEn: string | null;
  email: string;
  nickName: string | null;
  imageUrl?: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  createdBy?: number | null;
  updatedBy?: number | null;
  roles?: UserRoleModel[];
}

export type PublicUserModel = Omit<
  UserModel,
  'password' | 'deletedAt' | 'createdBy' | 'updatedBy'
>;
