import { Injectable } from '@nestjs/common';
import { IProfessorRepository } from './professor.abstract';
import { CreateProfessorModel, ProfessorModel } from 'src/models/professor';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { ProfessorFactory } from './professor.factory';

@Injectable()
export class ProfessorRepository implements IProfessorRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly professorFactory: ProfessorFactory,
  ) {}

  async createProfessor(data: CreateProfessorModel): Promise<ProfessorModel> {
    try {
      const professor = await this.prisma.professor.create({
        data,
        include: {
          user: true,
        },
      });
      return this.professorFactory.mapProfessorEntityToProfessorModel(
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
}
