import { Admin } from '@prisma/client';
import { UserEntity } from './user.entity';

export class AdminEntity implements Admin {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number | null;
  updatedBy: number | null;
  user: UserEntity;
}
