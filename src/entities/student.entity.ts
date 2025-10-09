import { Student } from '@prisma/client';
import { UserEntity } from './user.entity';
import { ClassBookEntity } from './class-book.entity';

export class StudentEntity implements Student {
  id: number;
  userId: number;
  studentId: string;
  linkedin: string | null;
  facebook: string | null;
  instragram: string | null;
  github: string | null;
  classBookId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  classBook?: ClassBookEntity;
  user?: UserEntity;
}
