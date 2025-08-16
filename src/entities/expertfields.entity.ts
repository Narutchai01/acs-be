import { ExpertFields } from '@prisma/client';
import { ProfessorEntity } from './professor.entity';

export class ExpertFieldsEntity implements ExpertFields {
  id: number;
  professorId: number;
  fieldId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  createdBy: number;
  updatedBy: number;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
  professor?: ProfessorEntity | null;
  field?: string | null;
}
