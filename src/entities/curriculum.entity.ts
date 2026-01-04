import { Curriculum } from '@prisma/client';
import { CourseEntity } from './course.entity';

export class CurriculumEntity implements Curriculum {
  id: number;
  year: string;
  title: string;
  fileUrl: string;
  imageUrl: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  courses?: CourseEntity[];
}
