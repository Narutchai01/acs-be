import { PrevCourse } from '@prisma/client';
import { CourseEntity } from './course.entity';

export class PrevCourseEntity implements PrevCourse {
  id: number;
  courseId: number;
  prevCourseId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  PrevCourse: CourseEntity;
  Course: CourseEntity;
}
