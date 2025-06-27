import { Admin } from '@prisma/client';
import { UserEntity } from './user.entity';

export class AdminEntity implements Admin {
  id: number;
  userId: number;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
  createdBy: number;
  updatedBy: number;
  user: UserEntity;
}
