import { Injectable } from '@nestjs/common';
import { CreateProfessorModel, UpdateProfessorModel, ProfessorModel } from 'src/models/professor';

@Injectable()
export abstract class IProfessorRepository {
  abstract createProfessor(data: CreateProfessorModel): Promise<ProfessorModel>;
  abstract updateProfessor(
    id: number,
    data: UpdateProfessorModel,
  ): Promise<ProfessorModel>;
}