import { Injectable } from '@nestjs/common';
import { IProfessorRepository } from 'src/repositories/professor/professor.abstract';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { ProfessorModel } from 'src/models/professor';

@Injectable()
export class ProfessorService {
  constructor(private professorRepository: IProfessorRepository) {}

  async createProfessor(
    createProfessor: CreateProfessorDto,
  ): Promise<ProfessorModel> {
    const data = {
      userId: createProfessor.userId,
      academicPosition: createProfessor.academicPosition,
      majorPosition: createProfessor.majorPosition,
      profRoom: createProfessor.profRoom,
      fieldOfExpertise: createProfessor.fieldOfExpertise,
      createdBy: createProfessor.createdBy,
      updatedBy: createProfessor.updatedBy,
    };

    return this.professorRepository.createProfessor(data);
  }
}
