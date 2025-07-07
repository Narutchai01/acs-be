import { Injectable } from '@nestjs/common';
import { CurriculumModel, CreateCurriculumModel } from 'src/models/curriculum';
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
}
