import { Admin } from '@prisma/client';

export class AdminEntity implements Admin {
  id: number;
  userRoleId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number | null;
  updatedBy: number | null;
}
