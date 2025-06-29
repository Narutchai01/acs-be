import { BaseModel } from '.';

export interface Student extends BaseModel {
  id: number;
  userId: number;
  studentId: string;
  linkedin?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  github?: string | null;
  yearOfFirstAdmission: number;
  yearOfCompletion?: number | null;
}
