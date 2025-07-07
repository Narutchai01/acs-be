import { Course, TypeCourse } from '@prisma/client';
import { UserEntity } from './user.entity';
import { CurriculumEntity } from './curriculum.entity';

export class CourseEntity implements Course {
  id: number;
  courseId: string;
  typeCourseId: number | null;
  curriculumId: number | null;
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
  curriculum?: CurriculumEntity | null;
}

export class TypeCourseEntity implements TypeCourse {
  id: number;
  name: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
}
