import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { IProfessorRepository } from './professor.abstract';
import { ProfessorFactory } from './professor.factory';
import {
  ProfessorModel,
  UpdateProfessorModel,
  CreateProfessorModel,
} from 'src/models/professor';

@Injectable()
export class ProfessorRepository implements IProfessorRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ProfessorFactory: ProfessorFactory,
  ) {}

  async createProfessor(data: CreateProfessorModel): Promise<ProfessorModel> {
    try {
      const professor = await this.prisma.professor.create({
        data,
        include: {
          user: true,
        },
      });
      return this.ProfessorFactory.mapProfessorEntityToProfessorModel(
        professor,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Create professor failed:', error.message);
        throw new Error(`Unable to create professor: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        throw new Error('Unable to create professor: Unknown error occurred');
      }
    }
  }

  async updateProfessor(
    id: number,
    data: UpdateProfessorModel,
  ): Promise<ProfessorModel> {
    try {
      const updateData = {
        ...data,
        updatedBy: data.updatedBy === null ? undefined : data.updatedBy,
      };
      const professorEntity = await this.prisma.professor.update({
        where: { id: id },
        data: updateData,
        include: {
          user: true,
        },
      });
      return this.ProfessorFactory.mapProfessorEntityToProfessorModel(
        professorEntity,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Update professor failed:', error.message);
        throw new Error(`Unable to update professor: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        throw new Error('Unable to update professor: Unknown error occurred');
      }
    }
  }
}
