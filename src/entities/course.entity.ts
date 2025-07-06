import { Course } from '@prisma/client';
import { UserEntity } from './user.entity';

export class CourseEntity implements Course {
  id: number;
  courseId: string;
  courseNameTh: string;
  courseNameEn: string;
  credits: string;
  courseDetail: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
  createdBy: number;
  updatedBy: number;
  user: UserEntity;
}
