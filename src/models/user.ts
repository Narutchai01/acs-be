import { BaseModel } from '.';
import { UserRoleModel } from './role';

export interface UserRefModel {
  id: number;
}

export interface UserModel extends BaseModel {
  id: number;
  firstNameTh: string;
  lastNameTh: string;
  firstNameEn: string | null;
  lastNameEn: string | null;
  email: string;
  nickName: string | null;
  imageUrl?: string | null;
  password?: string | null;
  userRole: UserRoleModel[];
}
