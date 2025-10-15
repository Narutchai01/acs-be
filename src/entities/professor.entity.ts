import { Professor } from '@prisma/client';
import { UserEntity } from './user.entity';
import { EducationEntity } from './education.entity';
import { ExpertFieldEntity } from './expertfields.entity';
import { AcademicPositionEntity } from './academicposition.entity';
import { MajorPositionEntity } from './majorposition.entity';
export class ProfessorEntity implements Professor {
  id: number;
  userId: number;
  academicPositionId: number;
  majorPositionId: number;
  profRoom: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  user?: UserEntity | null;
  education?: EducationEntity[] | null;
  expertFields?: ExpertFieldEntity[] | null;
  academicPosition?: AcademicPositionEntity | null;
  majorPosition?: MajorPositionEntity | null;
}
