import { ExpertFields } from '@prisma/client';

export class ExpertFieldEntity implements ExpertFields {
  id: number;
  professorId: number;
  field: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
}
