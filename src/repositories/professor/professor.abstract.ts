import { Injectable } from '@nestjs/common';
import { UpdateProfessorModel, ProfessorModel } from 'src/models/professor';

@Injectable()
export abstract class IProfessorRepository {
  abstract getProfessorById(id: number): Promise<ProfessorModel>;
  abstract updateProfessor(
    id: number,
    data: UpdateProfessorModel,
  ): Promise<ProfessorModel>;
  abstract deleteProfessor(id: number, userId: number): Promise<ProfessorModel>;
}
