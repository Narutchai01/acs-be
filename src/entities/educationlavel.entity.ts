import { EducationLevel } from '@prisma/client';

export class EducationLevelEntity implements EducationLevel {
  id: number;
  levelTh: string;
  levelEn: string;
  createdDate: Date;
  updatedDate: Date;
}
