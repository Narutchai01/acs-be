import { UserRoleEntity } from './role.entity';
export class UserEntity {
  id: number;
  firstNameTh!: string;
  lastNameTh!: string;
  firstNameEn?: string | null;
  lastNameEn?: string | null;
  email!: string;
  nickName?: string | null;
  imageUrl?: string | null;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date | null;
  createdBy?: number | null;
  updatedBy?: number | null;
  UserRole?: UserRoleEntity[];
}
