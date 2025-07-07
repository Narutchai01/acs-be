import { Injectable } from '@nestjs/common';
import { IPrevCourseRepository } from './prevcourse.abstract';
import { PrevCourseFactory } from './prevcourse.factory';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { CreatePrevCourseModel, PrevCourseModel } from 'src/models/prevcourse';

@Injectable()
export class PrevCourseRepository implements IPrevCourseRepository {
  constructor(
    private prevCourseFactory: PrevCourseFactory,
    private prisma: PrismaService,
  ) {}

  async create(data: CreatePrevCourseModel): Promise<PrevCourseModel> {
    const prevCourse = await this.prisma.prevCourse.create({
      data: {
        ...data,
        createdBy: data.createdBy ?? 0,
        updatedBy: data.updatedBy ?? 0,
      },
      include: {
        PrevCourse: {
          include: {
            user: true,
          },
        },
        Course: {
          include: {
            user: true,
          },
        },
      },
    });

    // Transform the Prisma result to match PrevCourseEntity structure
    const prevCourseEntity = {
      ...prevCourse,
      PrevCourse: {
        ...prevCourse.PrevCourse,
        PrevCourse: [],
        PrerequisiteFor: [],
      },
      Course: {
        ...prevCourse.Course,
        PrevCourse: [],
        PrerequisiteFor: [],
      },
    };

    return this.prevCourseFactory.mapPrevCourseEntityToPrevCourseModel(
      prevCourseEntity,
    );
  }
}
