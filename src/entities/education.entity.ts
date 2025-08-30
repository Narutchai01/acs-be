import { Education } from '@prisma/client';
import { ProfessorEntity } from './professor.entity';
import { EducationLevel } from '@prisma/client';

export class EducationEntity implements Education {
  university: string;
  id: number;
  levelId: number;
  professorId: number;
  education: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  updatedBy: number;
  createdBy: number;
  professor?: ProfessorEntity | null;
  educationLevel: EducationLevel;
}
