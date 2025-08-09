import { majorposition } from '@prisma/client';
import { UserEntity } from './user.entity';

export class MajorPositionEntity implements majorposition {
  id: number;
  positionTh: string;
  createdDate: Date;
  updatedDate: Date;
  createdBy: number;
  updatedBy: number;
  user: UserEntity;
}