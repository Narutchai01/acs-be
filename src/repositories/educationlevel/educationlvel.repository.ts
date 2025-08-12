import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { EducationLevelModel } from 'src/models/educationlavel';
import { EducationLevelFactory } from './educationlvel.factory';
import { IEducationLevelRepository } from './educationlvel.abstract';

@Injectable()
export class EducationLevelRepository implements IEducationLevelRepository {
  constructor(
    private prisma: PrismaService,
    private educationLevelFactory: EducationLevelFactory,
  ) {}

  async getEducationLevels(): Promise<EducationLevelModel[]> {
    const educationLevels = await this.prisma.educationLevel.findMany();
    return this.educationLevelFactory.mapEducationLevelEntitiesToModels(
      educationLevels,
    );
  }
}
