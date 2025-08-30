import { BaseModel } from '.';
import { AcademicPositionModel } from './academicposition';
import { EducationModel } from './education';
import { ExpertFieldModel } from './expertfields';
import { MajorPositionModel } from './majorposition';
import { UserModel } from './user';

export interface ProfessorModel extends BaseModel {
  id: number;
  userId: number;
  academicPositionId: number;
  majorPositionId: number;
  profRoom: string;
  createdBy: number;
  updatedBy: number;
  user?: UserModel | null;
  education: EducationModel[];
  expertFields: ExpertFieldModel[];
  academicPosition?: AcademicPositionModel | null;
  majorPosition?: MajorPositionModel | null;
}

export interface UpdateProfessorModel extends BaseModel {
  userId: number;
  academicPosition: number;
  majorPosition: number;
  profRoom: string;
  fieldOffexpertise: string;
  updatedBy: number;
}

export interface CreateProfessorModel extends BaseModel {
  userId: number;
  academicPositionId: number;
  majorPositionId: number;
  profRoom: string;
  createdBy: number;
  updatedBy: number;
}
