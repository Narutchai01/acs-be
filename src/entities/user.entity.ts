import { User } from '@prisma/client';
import { UserRoleEntity } from './role.entity';
export class UserEntity implements User {
  createdBy: number | null;
  updatedBy: number | null;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date;
  id: number;
  firstNameTh!: string;
  lastNameTh!: string;
  firstNameEn!: string | null;
  lastNameEn!: string | null;
  email!: string;
  nickName!: string | null;
  imageUrl!: string | null;
  password!: string | null;
  UserRole?: UserRoleEntity[];
}
