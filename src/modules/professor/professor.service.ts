import { Injectable } from '@nestjs/common';
import { ProfessorModel } from 'src/models/professor';
import { IProfessorRepository } from 'src/repositories/professor/professor.abstract';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessorService {
  constructor(private professorRespository: IProfessorRepository) {}

  async updateProfessor(
    id: number,
    data: UpdateProfessorDto,
    editerId: number,
  ): Promise<ProfessorModel> {
    const existingProfessor =
      await this.professorRespository.getProfessorById(id);

    const updateData = {
      academicPosition:
        Number(data.academicPosition) || existingProfessor.academicPosition,
      majorPosition:
        Number(data.majorPosition) || existingProfessor.majorPosition,
      profRoom: data.profRoom || existingProfessor.profRoom,
      fieldOffexpertise: String(
        data.fieldOffexpertise || existingProfessor.fieldOffexpertise,
      ),
      updatedBy: editerId,
    };

    return this.professorRespository.updateProfessor(id, updateData);
  }

  async deleteProfessor(id: number, userId: number): Promise<ProfessorModel> {
    return this.professorRespository.deleteProfessor(id, userId);
  }
}
