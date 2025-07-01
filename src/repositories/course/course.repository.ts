import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { ICourseRepository } from './course.abstract';
import {
  CourseModel,
  CreateCourseModel,
  UpdateCourseModel,
} from 'src/models/course';
import { CourseFactory } from './course.factory';

@Injectable()
export class CourseRepository implements ICourseRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly CourseFactory: CourseFactory,
  ) { }

  async createCourse(data: CreateCourseModel): Promise<CourseModel> {
    try {
      const course = await this.prisma.course.create({
        data,
        include: {
          user: true,
        },
      });
      return this.CourseFactory.mapCourseEntityToCourseModel(course);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('create course failed:', error.message);
        throw new Error(`Unable to create course: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        throw new Error('Unable to create course: Unknown error occurred');
      }
    }
  }

  async updateCourse(id: number, data: UpdateCourseModel): Promise<CourseModel> {
    try {
      const updateData = {
        ...data,
        updatedBy: data.updatedBy === null ? undefined : data.updatedBy,
      };
      const newsEntity = await this.prisma.course.update({
        where: { id: id },
        data: updateData,
        include: {
          user: true,
        },
      });
      return this.CourseFactory.mapCourseEntityToCourseModel(newsEntity);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Update course failed:', error.message);
        throw new Error(`Unable to update course: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        throw new Error('Unable to update course: Unknown error occurred');
      }
    }
  }
}
