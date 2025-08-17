import { Injectable } from '@nestjs/common';
import { IMajorPositionRepository } from './majorposition.abstract';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { MajorPositionFactory } from './majorposition.factory';
import { MajorPositionModel } from 'src/models/majorposition';

@Injectable()
export class MajorPositionRepository implements IMajorPositionRepository {
  constructor(
    private majorPositionFactory: MajorPositionFactory,
    private prisma: PrismaService,
  ) {}

  async get(): Promise<MajorPositionModel[]> {
    const position = await this.prisma.majorPosition.findMany();
    return this.majorPositionFactory.mapMajorPositionEnitiesToMajorPositionModels(
      position,
    );
  }
}
