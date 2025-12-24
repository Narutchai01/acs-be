import { MajorPosition } from '@prisma/client';

export class MajorPositionEntity implements MajorPosition {
  id: number;
  positionTh: string;
  positionEn: string;
  createdAt: Date;
  updatedAt: Date;
}
