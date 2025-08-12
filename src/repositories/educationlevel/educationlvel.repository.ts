import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { EducationLevelModel } from 'src/models/educationlavel';
import { EducationLevelFactory } from './educationlvel.factory';

@Injectable()
export class EducationLevelRepository {
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
