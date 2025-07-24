import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CurriculumModel,
  CreateCurriculumModel,
  UpdateCurriculumModel,
} from 'src/models/curriculum';
import { CurriculumFactory } from './curriculum.factory';
import { ICurriculumRepository } from './curriculum.abstract';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';

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

  async getList(): Promise<CurriculumModel[]> {
    const curriculums = await this.prisma.curriculum.findMany({
      where: { deletedDate: null },
      include: {
        courses: false,
      },
    });

    return this.curriculumFactory.mapCurriculumEntitiesToCurriculumModels(
      curriculums,
    );
  }
  async count(): Promise<number> {
    return this.prisma.curriculum.count({
      where: { deletedDate: null },
    });
  }

  async getById(id: number): Promise<CurriculumModel> {
    const curriculum = await this.prisma.curriculum.findUnique({
      where: { id, deletedDate: null },
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
      where: { id: curriculumId, deletedDate: null },
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
      where: { id, deletedDate: null },
      data: { deletedDate: new Date(), updatedBy },
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
