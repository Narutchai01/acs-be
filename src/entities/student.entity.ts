import { Student } from '@prisma/client';

export class StudentEntity implements Student {
  id: number;
  userId!: number;
  studentId!: string;
  linkedin!: string | null;
  facebook!: string | null;
  instagram!: string | null;
  github!: string | null;
  yearOfFirstAdmission!: number;
  yearOfCompletion!: number | null;
  classOf!: string;
  createdAt!: Date;
  updatedAt!: Date;
  createdBy!: number | null;
  updatedBy!: number | null;
}
