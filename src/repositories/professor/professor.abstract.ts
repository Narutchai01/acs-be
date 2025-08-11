import { Injectable } from '@nestjs/common';
import { UpdateProfessorModel, ProfessorModel } from 'src/models/professor';

@Injectable()
export abstract class IProfessorRepository {
  abstract updateProfessor(
    id: number,
    data: UpdateProfessorModel,
  ): Promise<ProfessorModel>;
}
