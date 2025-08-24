import { AcademicPosition } from '@prisma/client';

export class AcademicPositionEntity implements AcademicPosition {
  id: number;
  positionTh: string;
  positionEn: string;
  createdDate: Date;
  updatedDate: Date;
}
