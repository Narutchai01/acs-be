import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { IProfessorRepository } from './professor.abstract';
import { ProfessorFactory } from './professor.factory';
import { ProfessorModel, UpdateProfessorModel } from 'src/models/professor';

@Injectable()
export class ProfessorRepository implements IProfessorRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ProfessorFactory: ProfessorFactory,
  ) {}
  async getProfessorById(id: number): Promise<ProfessorModel> {
    try {
      const ProfessorEntity = await this.prisma.professor.findUnique({
        where: {
          id: id,
          deletedDate: null,
        },
        include: {
          user: true,
        },
      });
      if (!ProfessorEntity) {
        throw new Error(`Professor not found for ID ${id}`);
      }
      return this.ProfessorFactory.mapProfessorEntityToProfessorModel(
        ProfessorEntity,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Get Professor by ID failed:', error.message);
        throw new Error(`Unable to get Professor by ID: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        throw new Error(
          'Unable to get Professor by ID: Unknown error occurred',
        );
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

  async deleteProfessor(id: number, userId): Promise<ProfessorModel> {
    try {
      const professorEntity = await this.prisma.professor.update({
        where: { id: id },
        data: {
          deletedDate: new Date(),
          updatedBy: userId,
        },
        include: {
          user: true,
        },
      });
      return this.ProfessorFactory.mapProfessorEntityToProfessorModel(
        professorEntity,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Delete Professor failed:', error.message);
        throw new Error(`Unable to delete Professor: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        throw new Error('Unable to delete Professor: Unknown error occurred');
      }
    }
  }
}
