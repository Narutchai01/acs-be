import { Injectable } from '@nestjs/common';
import { CreateProfessorModel, ProfessorModel } from 'src/models/professor';

@Injectable()
export abstract class IProfessorRepository {
  abstract create(data: CreateProfessorModel): Promise<ProfessorModel>;
}
