import { Injectable } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { IProfessorRepository } from 'src/repositories/professor/professor.abstract';
import { ProfessorModel } from 'src/models/professor';

@Injectable()
export class ProfessorService {
  constructor(private readonly professorRepository: IProfessorRepository) {}

  async createProfessor(data: CreateProfessorDto): Promise<ProfessorModel> {
    const newData = {
      ...data,
    };
    const professor = await this.professorRepository.createProfessor(newData);
    return professor;
  }
}
