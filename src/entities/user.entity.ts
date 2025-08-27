import { User } from '@prisma/client';
import { UserRoleEntity } from './role.entity';
export class UserEntity implements User {
  id: number;
  firstNameTh!: string;
  lastNameTh!: string;
  firstNameEn!: string | null;
  lastNameEn!: string | null;
  email!: string;
  nickName!: string | null;
  imageUrl!: string | null;
  password!: string | null;
  createdDate!: Date;
  updatedDate!: Date;
  deletedDate!: Date | null;
  createdBy!: number | null;
  updatedBy!: number | null;
  UserRole?: UserRoleEntity[];
}
