import { Injectable } from '@nestjs/common';
import { IPrevCourseRepository } from './prevcourse.abstract';
import { PrevCourseFactory } from './prevcourse.factory';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { CreatePrevCourseModel, PrevCourseModel } from 'src/models/prevcourse';
import { PrevCourseEntity } from 'src/entities/prevcours.entity';

@Injectable()
export class PrevCourseRepository implements IPrevCourseRepository {
  constructor(
    private prevCourseFactory: PrevCourseFactory,
    private prisma: PrismaService,
  ) {}

  async create(data: CreatePrevCourseModel[]): Promise<PrevCourseModel[]> {
    // Create records one by one with proper relations
    const createdRecords: PrevCourseEntity[] = [];

    for (const item of data) {
      const createdRecord = await this.prisma.prevCourse.create({
        data: item,
        include: {
          Course: {
            include: {
              user: true,
              curriculum: true,
            },
          },
          PrevCourse: {
            include: {
              user: true,
              curriculum: true,
            },
          },
        },
      });
      createdRecords.push(createdRecord as PrevCourseEntity);
    }

    return this.prevCourseFactory.mapPrevCourseEntitiseToPrevCourseModels(
      createdRecords,
    );
  }
}
