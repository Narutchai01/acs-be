import { EducationLevel } from '@prisma/client';

export class EducationLevelEntity implements EducationLevel {
  id: number;
  level: string;
  createdDate: Date;
  updatedDate: Date;
}
