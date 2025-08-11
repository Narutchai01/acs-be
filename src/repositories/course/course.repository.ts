import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { ICourseRepository } from './course.abstract';
import {
  CourseModel,
  CreateCourseModel,
  UpdateCourseModel,
} from 'src/models/course';
import { CourseFactory } from './course.factory';
import { QueryCourseDto } from 'src/modules/course/dto/get-course.dto';
import calculatePagination from 'src/core/utils/calculatePagination';
import { CourseEntity } from 'src/entities/course.entity';

@Injectable()
export class CourseRepository implements ICourseRepository {
  private readonly logger = new Logger(CourseRepository.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly CourseFactory: CourseFactory,
  ) {}

  async createCourse(data: CreateCourseModel): Promise<CourseModel> {
    try {
      const course = await this.prisma.course.create({
        data,
        include: {
          curriculum: true,
          PrevCourse: {
            include: {
              PrevCourse: true,
            },
          },
        },
      });
      return this.CourseFactory.mapCourseEntityToCourseModel(
        course as CourseEntity,
      );
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

  async updateCourse(
    id: number,
    data: UpdateCourseModel,
  ): Promise<CourseModel> {
    try {
      const updateData = {
        ...data,
        updatedBy: data.updatedBy === null ? undefined : data.updatedBy,
      };
      const courseEntity = await this.prisma.course.update({
        where: { id: id },
        data: updateData,
        include: {
          curriculum: true,
          PrevCourse: {
            include: {
              PrevCourse: true,
            },
          },
        },
      });
      return this.CourseFactory.mapCourseEntityToCourseModel(
        courseEntity as CourseEntity,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error('Update course failed:', error.message);
        throw new Error(`Unable to update course: ${error.message}`);
      } else {
        this.logger.error('Unknown error:', error as Error);
        throw new Error('Unable to update course: Unknown error occurred');
      }
    }
  }

  async getCourse(query: QueryCourseDto): Promise<CourseModel[]> {
    try {
      const { page, pageSize, searchByTypeCourse, prerequisite } = query;
      const course = await this.prisma.course.findMany({
        where: {
          deletedDate: null,
          TypeCourse: {
            name: {
              contains: searchByTypeCourse,
            },
          },
        },
        take: pageSize,
        skip: calculatePagination(page, pageSize),
        include: {
          curriculum: true,
          PrevCourse: {
            include: {
              PrevCourse: prerequisite,
            },
          },
        },
      });

      return course.map((course) =>
        this.CourseFactory.mapCourseEntityToCourseModel(course as CourseEntity),
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Get course failed Repository:', error.message);
        throw new Error(`Unable to get courses: ${error.message}`);
      } else {
        this.logger.error(
          'Unknown error:',
          error instanceof Error ? error : 'Unknown error',
        );
        throw new Error('Unable to get courses: Unknown error occurred');
      }
    }
  }

  async getCourseById(id: number): Promise<CourseModel> {
    try {
      const course = await this.prisma.course.findUnique({
        where: {
          id: id,
          deletedDate: null,
        },
        include: {
          curriculum: true,
          PrevCourse: {
            include: {
              PrevCourse: true,
            },
          },
        },
      });
      if (!course) {
        throw new Error('Course not found');
      }
      return this.CourseFactory.mapCourseEntityToCourseModel(
        course as CourseEntity,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Get course by ID failed:', error.message);
        throw new Error(`Unable to get course by ID: ${error.message}`);
      } else {
        this.logger.error(
          'Unknown error:',
          error instanceof Error ? error : 'Unknown error',
        );
        throw new Error('Unable to get course by ID: Unknown error occurred');
      }
    }
  }

  async deleteCourse(id: number, userId: number): Promise<CourseModel> {
    try {
      const courseEntity = await this.prisma.course.update({
        where: { id: id },
        data: {
          deletedDate: new Date(),
          updatedBy: userId,
        },
        include: {
          user: true,
        },
      });
      return this.CourseFactory.mapCourseEntityToCourseModel(
        courseEntity as CourseEntity,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Delete course failed:', error.message);
        throw new Error(`Unable to delete course: ${error.message}`);
      } else {
        this.logger.error(
          'Unknown error:',
          error instanceof Error ? error : 'Unknown error',
        );
        throw new Error('Unable to delete course: Unknown error occurred');
      }
    }
  }

  count(query: QueryCourseDto): Promise<number> {
    return this.prisma.course.count({
      where: {
        deletedDate: null,
        TypeCourse: {
          name: {
            contains: query.searchByTypeCourse,
          },
        },
      },
    });
  }
}
