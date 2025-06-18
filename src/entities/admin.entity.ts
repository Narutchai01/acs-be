import { Admin } from '@prisma/client';
import { UserRoleEntity } from './role.entity';

export class AdminEntity implements Admin {
  id: number;
  userRoleId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number | null;
  updatedBy: number | null;
  userRole: UserRoleEntity;
}
