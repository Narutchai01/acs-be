import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { ICourseRepository } from './course.abstract';
import { CourseModel, CreateCourseModel } from 'src/models/course';
import { CourseFactory } from './course.factory';

@Injectable()
export class CourseRepository implements ICourseRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly CourseFactory: CourseFactory,
  ) {}

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

  async getCourseById(id: number): Promise<CourseModel> {
    try {
      const course = await this.prisma.course.findUnique({
        where: { id },
        include: {
          user: true,
        },
      });
      if (!course) {
        throw new Error(`Course with ID ${id} not found`);
      }
      return this.CourseFactory.mapCourseEntityToCourseModel(course);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('get course by id failed:', error.message);
        throw new Error(`Unable to get course by ID: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        throw new Error('Unable to get course by ID: Unknown error occurred');
      }
    }
  }
}
