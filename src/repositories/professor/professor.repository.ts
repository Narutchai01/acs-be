import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { IProfessorRepository } from './professor.abstract';
import { CreateProfessorModel, ProfessorModel } from 'src/models/professor';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { ProfessorFactory } from './professor.factory';
import { CreateEducationModel } from 'src/models/education';
import { CreateExpertField } from 'src/models/expertfields';
import { QueryProfessorDto } from 'src/modules/professor/dto/get-professors.dto';
import calculatePagination from 'src/core/utils/calculatePagination';

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

  async getProfessors(query: QueryProfessorDto): Promise<ProfessorModel[]> {
    try {
      const {
        page,
        pageSize,
        searchByName,
        expertFields,
        majorPosition,
        academicPosition,
        sortBy,
        sortOrder,
      } = query;

      const whereClause = {
        searchByName: searchByName
          ? {
              OR: [
                {
                  firstNameTh: {
                    contains: searchByName,
                    mode: 'insensitive' as const,
                  },
                },
                {
                  lastNameTh: {
                    contains: searchByName,
                    mode: 'insensitive' as const,
                  },
                },
              ],
            }
          : undefined,
        deletedAt: null,
      };

      const professorEntities = await this.prisma.professor.findMany({
        where: whereClause,
        include: {
          user: true,
          education: {
            include: {
              educationLevel: true,
            },
          },
          expertFields: expertFields
            ? {
                where: { deletedAt: null },
              }
            : false,
          academicPosition: academicPosition,
          majorPosition: majorPosition,
        },
        ...(pageSize && { take: Number(pageSize) }),
        ...(page &&
          pageSize && { skip: calculatePagination(page, Number(pageSize)) }),

        orderBy: sortBy
          ? sortBy === 'firstNameTh'
            ? {
                user: {
                  firstNameTh: sortOrder || 'asc',
                },
              }
            : {
                [sortBy]: sortOrder || 'asc',
              }
          : { id: 'asc' },
      });

      return this.professorFactory.mapProfessorEntitiesToProfessorModels(
        professorEntities,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Get professors failed:', error.message);
        throw new Error(`Unable to get professors: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        throw new Error('Unable to get professors: Unknown error occurred');
      }
    }
  }

  async countProfessors(query: QueryProfessorDto): Promise<number> {
    try {
      const { searchByName } = query;

      const whereClause = {
        user: searchByName
          ? {
              OR: [
                {
                  firstNameTh: {
                    contains: searchByName,
                    mode: 'insensitive' as const,
                  },
                },
                {
                  lastNameTh: {
                    contains: searchByName,
                    mode: 'insensitive' as const,
                  },
                },
              ],
            }
          : undefined,
        deletedAt: null,
      };

      return this.prisma.professor.count({
        where: whereClause,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Count professors failed:', error.message);
        throw new Error(`Unable to count professors: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        throw new Error('Unable to count professors: Unknown error occurred');
      }
    }
  }
}
