import { Example } from '@prisma/client';

export class ExampleEntity implements Example {
  id: number;
  name: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
  createdBy: number | null;
  updatedBy: number | null;
}
