import { Curriculum } from '@prisma/client';
import { CourseEntity } from './course.entity';

export class CurriculumEntity implements Curriculum {
  id: number;
  year: string;
  fileUrl: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
  createdBy: number;
  updatedBy: number;
  courses?: CourseEntity[];
}
