import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { IProfessorRepository } from './professor.abstract';
import { CreateProfessorModel, ProfessorModel } from 'src/models/professor';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { ProfessorFactory } from './professor.factory';
import { CreateEducationModel } from 'src/models/education';
import { CreateExpertField } from 'src/models/expertfields';

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
          where: { deletedAt: null },
          include: {
            educationLevel: true,
          },
        },
        expertFields: {
          where: { deletedAt: null },
        },
        academicPosition: true,
        majorPosition: true,
      },
    });

    return this.professorFactory.mapProfessorEntityToProfessorModel(professor);
  }

  async createEducations(data: CreateEducationModel[]): Promise<void> {
    await this.prisma.education.createMany({
      data,
    });
  }

  async createExpertFields(data: CreateExpertField[]): Promise<void> {
    await this.prisma.expertFields.createMany({
      data,
    });
  }

  async getProfessorById(id: number): Promise<ProfessorModel> {
    const professor = await this.prisma.professor.findFirst({
      where: { id, deletedAt: null },
      include: {
        user: true,
        education: {
          where: { deletedAt: null },
          include: {
            educationLevel: true,
          },
        },
        expertFields: {
          where: { deletedAt: null },
        },
        academicPosition: true,
        majorPosition: true,
      },
    });

    if (!professor) {
      throw new HttpException('Professor not found', HttpStatus.NOT_FOUND);
    }

    return this.professorFactory.mapProfessorEntityToProfessorModel(professor);
  }
}
