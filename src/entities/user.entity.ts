import { UserRoleEntity } from './role.entity';
import { User } from '@prisma/client';
export class UserEntity implements User {
  id: number;
  firstNameTh!: string;
  lastNameTh!: string;
  firstNameEn!: string | null;
  lastNameEn!: string | null;
  email!: string;
  nickName!: string | null;
  imageUrl!: string | null;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date | null;
  createdBy!: number | null;
  updatedBy!: number | null;
  UserRole?: UserRoleEntity[];
}
