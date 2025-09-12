import { Injectable } from '@nestjs/common';
import { CreateEducationModel } from 'src/models/education';
import { CreateProfessorModel, ProfessorModel } from 'src/models/professor';
import { CreateExpertField } from 'src/models/expertfields';
import { QueryProfessorDto } from 'src/modules/professor/dto/get-professors.dto';

@Injectable()
export abstract class IProfessorRepository {
  abstract createProfessor(data: CreateProfessorModel): Promise<ProfessorModel>;
  abstract createEducations(data: CreateEducationModel[]): Promise<void>;
  abstract createExpertFields(data: CreateExpertField[]): Promise<void>;
  abstract getProfessorById(id: number): Promise<ProfessorModel>;
  abstract getProfessors(query: QueryProfessorDto): Promise<ProfessorModel[]>;
}
