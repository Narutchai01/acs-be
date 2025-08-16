import { ExpertFields } from '@prisma/client';
import { ProfessorEntity } from './professor.entity';
import { ListTypeEntity } from './type.entity';

export class ExpertFieldEntity implements ExpertFields {
  id: number;
  professorId: number;
  fieldId: number;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
  createdBy: number;
  updatedBy: number;
  professor?: ProfessorEntity;
  field?: ListTypeEntity;
}
