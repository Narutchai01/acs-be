import { Professor } from '@prisma/client';
import { UserEntity } from './user.entity';
import { TeachingAssignment } from '@prisma/client';
import { CourseEntity } from './course.entity';

export class ProfessorEntity implements Professor {
  id: number;
  userId: number;
  academicPosition: number;
  majorPosition: number;
  profRoom: string;
  fieldOffexpertise: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
  createdBy: number;
  updatedBy: number;
  user: UserEntity;
}

export class TeacghingAssignmentEntity implements TeachingAssignment {
  id: number;
  professorId: number;
  courseId: number;
  semesterId: number;
  academicYearId: number;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
  createdBy: number;
  updatedBy: number;
  professor: ProfessorEntity | null;
  course: CourseEntity;
  user?: UserEntity | null;
}
