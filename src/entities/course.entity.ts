import { Course, TypeCourse } from '@prisma/client';
import { UserEntity } from './user.entity';
import { CurriculumEntity } from './curriculum.entity';
import { PrevCourseEntity } from './prevcours.entity';

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
  user?: UserEntity | null;
  curriculum?: CurriculumEntity | null;
  PrevCourse: PrevCourseEntity[];
  PrerequisiteFor: PrevCourseEntity[];
}

export class TypeCourseEntity implements TypeCourse {
  id: number;
  name: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
}
