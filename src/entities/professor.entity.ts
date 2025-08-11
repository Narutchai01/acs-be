import { Professor } from '@prisma/client';
import { UserEntity } from './user.entity';

export class ProfesserEntity implements Professor {
  id: number;
  userId: number;
  academicPosition: number;
  majorPosition: number;
  profRoom: string;
  fieldOfExpertise: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
  createdBy: number;
  updatedBy: number;
  user: UserEntity;
}
