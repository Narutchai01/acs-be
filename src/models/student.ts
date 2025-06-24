export interface Student {
  id: number;
  userId: number;
  studentId: string;
  linkedin?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  github?: string | null;
  yearOfFirstAdmission: number;
  yearOfCompletion?: number | null;
  createDate: Date;
  updatedAt: Date;
  createdBy?: number | null;
  updatedBy?: number | null;
}
