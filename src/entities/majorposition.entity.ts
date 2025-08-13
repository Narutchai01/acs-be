import { majorPosition } from '@prisma/client';
import { UserEntity } from './user.entity';

export class MajorPositionEntity implements majorPosition {
  id: number;
  positionTh: string;
  positionEn: string;
  createdDate: Date;
  updatedDate: Date;
  createdBy: number;
  updatedBy: number;
  user: UserEntity;
}
