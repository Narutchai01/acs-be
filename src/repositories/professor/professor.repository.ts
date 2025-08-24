import { Injectable } from '@nestjs/common';
import { IProfessorRepository } from './professor.abstract';
import { CreateProfessorModel, ProfessorModel } from 'src/models/professor';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { ProfessorFactory } from './professor.factory';

@Injectable()
export class ProfessorRepository implements IProfessorRepository {
  constructor(
    private prisma: PrismaService,
    private professorFactory: ProfessorFactory,
  ) {}

  async createProfessor(data: CreateProfessorModel): Promise<ProfessorModel> {
    const professor = await this.prisma.professor.create({
      data,
      include: {
        user: true,
        education: {
          where: { deletedDate: null },
          include: {
            educationLevel: true,
          },
        },
        expertFields: {
          where: { deletedDate: null },
        },
        academicPosition: true,
        majorPosition: true,
      },
    });

    return this.professorFactory.mapProfessorEntityToProfessorModel(professor);
  }
}
