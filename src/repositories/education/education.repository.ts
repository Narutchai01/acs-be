import { Injectable } from '@nestjs/common';
import { IEducationRepository } from './education.abstract';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { EducationFactory } from './education.factory';
import { CreateEducationModel, EducationModel } from 'src/models/education';

@Injectable()
export class EducationRepository implements IEducationRepository {
  constructor(
    private prisma: PrismaService,
    private educationFactory: EducationFactory,
  ) {}

  async create(data: CreateEducationModel): Promise<EducationModel> {
    const education = await this.prisma.education.create({
      data,
      include: {
        professor: false,
        educationLevel: true,
      },
    });

    return this.educationFactory.mapEducationEntityToEducationModel(education);
  }
}
