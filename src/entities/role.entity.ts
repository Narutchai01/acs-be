import { Role, UserRole } from '@prisma/client';
import { UserEntity } from './user.entity';
export class RoleEntity implements Role {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export class UserRoleEntity implements UserRole {
  id: number;
  userId: number;
  roleId: number;
  user: UserEntity;
  role: RoleEntity;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
  createdBy: number;
  updatedBy: number;
}
