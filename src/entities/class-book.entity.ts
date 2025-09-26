import { ClassBook } from '@prisma/client';
import { StudentEntity } from './student.entity';

export class ClassBookEntity implements ClassBook {
  image: string;
  id: number;
  classof: number;
  firstYearAcademic: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  student?: StudentEntity[];
}
