import { Injectable } from '@nestjs/common';
import { IProfessorRepository } from 'src/repositories/professor/professor.abstract';

@Injectable()
export class ProfessorService {
  constructor(private professorRepository: IProfessorRepository) {}

  async create(data: any): Promise<any> {
    return this.professorRepository.create(data);
    }
}