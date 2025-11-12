import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CurriculumModel,
  CreateCurriculumModel,
  UpdateCurriculumModel,
} from 'src/models/curriculum';
import { CurriculumFactory } from './curriculum.factory';
import { ICurriculumRepository } from './curriculum.abstract';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { QueryCurriculumDto } from 'src/modules/curriculum/dto/v1/get-curriculum.dto';
import calculatePagination from 'src/core/utils/calculatePagination';

@Injectable()
export class CurriculumRepository implements ICurriculumRepository {
  constructor(
    private curriculumFactory: CurriculumFactory,
    private prisma: PrismaService,
  ) {}

  async create(data: CreateCurriculumModel): Promise<CurriculumModel> {
    const curriculum = await this.prisma.curriculum.create({
      data,
      include: {
        courses: false,
      },
    });

    return this.curriculumFactory.mapCurriculumEntityToCurriculumModel(
      curriculum,
    );
  }

  async getList(query: QueryCurriculumDto): Promise<CurriculumModel[]> {
    const {
      page = 1,
      pageSize = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search,
    } = query;

    const skip = calculatePagination(page, pageSize);

    // Build orderBy object dynamically
    const orderBy = sortBy
      ? { [sortBy]: sortOrder }
      : { createdAt: 'desc' as const };

    const curriculums = await this.prisma.curriculum.findMany({
      where: {
        deletedAt: null,
        year: search ? { contains: search } : undefined,
      },
      orderBy,
      skip,
      take: pageSize,
    });

    return this.curriculumFactory.mapCurriculumEntitiesToCurriculumModels(
      curriculums,
    );
  }
  async count(): Promise<number> {
    return this.prisma.curriculum.count({
      where: { deletedAt: null },
    });
  }

  async getById(id: number): Promise<CurriculumModel> {
    const curriculum = await this.prisma.curriculum.findUnique({
      where: { id, deletedAt: null },
      include: {
        courses: false,
      },
    });

    if (!curriculum) {
      throw new HttpException(
        `Curriculum with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.curriculumFactory.mapCurriculumEntityToCurriculumModel(
      curriculum,
    );
  }

  async update(
    curriculumId: number,
    data: UpdateCurriculumModel,
  ): Promise<CurriculumModel> {
    const curriculum = await this.prisma.curriculum.update({
      where: { id: curriculumId, deletedAt: null },
      data,
      include: {
        courses: false,
      },
    });

    return this.curriculumFactory.mapCurriculumEntityToCurriculumModel(
      curriculum,
    );
  }

  async delete(id: number, updatedBy: number): Promise<CurriculumModel> {
    const curriculum = await this.prisma.curriculum.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date(), updatedBy },
      include: {
        courses: false,
      },
    });

    if (!curriculum) {
      throw new HttpException(
        `Curriculum with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.curriculumFactory.mapCurriculumEntityToCurriculumModel(
      curriculum,
    );
  }
}
