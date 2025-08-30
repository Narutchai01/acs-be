import { ExpertFields } from '@prisma/client';

export class ExpertFieldEntity implements ExpertFields {
  id: number;
  professorId: number;
  field: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
