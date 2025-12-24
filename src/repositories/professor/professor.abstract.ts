import { Injectable } from '@nestjs/common';
import {
  CreateEducationModel,
  IUpdateEducationModel,
} from 'src/models/education';
import {
  CreateProfessorModel,
  IUpdateProfessorModel,
  ProfessorModel,
} from 'src/models/professor';
import { CreateExpertField, IUpdateExpertField } from 'src/models/expertfields';
import { QueryProfessorDto } from 'src/modules/professor/dto/get-professors.dto';

@Injectable()
export abstract class IProfessorRepository {
  abstract createProfessor(data: CreateProfessorModel): Promise<ProfessorModel>;
  abstract createEducations(data: CreateEducationModel[]): Promise<void>;
  abstract createExpertFields(data: CreateExpertField[]): Promise<void>;
  abstract getProfessorById(id: number): Promise<ProfessorModel>;
  abstract getProfessors(query: QueryProfessorDto): Promise<ProfessorModel[]>;
  abstract countProfessors(query: QueryProfessorDto): Promise<number>;
  abstract updateProfessor(
    id: number,
    data: Partial<IUpdateProfessorModel>,
  ): Promise<ProfessorModel>;
  abstract updateEducation(
    professorId: number,
    data: Partial<IUpdateEducationModel>[],
  ): Promise<void>;
  abstract deleteEducationByducationId(educationIds: number[]): Promise<void>;
  abstract updateExpertFields(
    professorId: number,
    data: Partial<IUpdateExpertField>[],
  ): Promise<void>;
  abstract deleteExpertFields(expertFieldIds: number[]): Promise<void>;
}
