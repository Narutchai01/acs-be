import { EducationLevel } from '@prisma/client';

export class EducationLevelEntity implements EducationLevel {
  id: number;
  level: string;
  createdAt: Date;
  updatedAt: Date;
}
