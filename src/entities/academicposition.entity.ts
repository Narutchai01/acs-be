import { AcademicPosition } from '@prisma/client';

export class AcademicPositionEntity implements AcademicPosition {
  id: number;
  positionTh: string;
  positionEn: string;
  createdAt: Date;
  updatedAt: Date;
}
