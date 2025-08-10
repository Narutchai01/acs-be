import { Injectable } from '@nestjs/common';
import { UpdateProfessorModel, ProfessrModel } from 'src/models/professor';

@Injectable
export abstract class IProfessor {
  abstract updateProfessor(data: UpdateProfessorModel): Promise<ProfessrModel>;
}
