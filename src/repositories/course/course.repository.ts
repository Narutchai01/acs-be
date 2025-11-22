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
          TypeCourse: true,
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
          TypeCourse: true,
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
      const {
        page,
        pageSize,
        prerequisite,
        typecourseId,
        curriculumId,
        search,
      } = query;
      const course = await this.prisma.course.findMany({
        where: {
          deletedAt: null,
          typeCourseId: typecourseId,
          curriculumId: { in: curriculumId },
          ...(search && {
            OR: [
              { courseId: { contains: search, mode: 'insensitive' } },
              { courseNameTh: { contains: search, mode: 'insensitive' } },
              { courseNameEn: { contains: search, mode: 'insensitive' } },
            ],
          }),
        },
        ...(pageSize && { take: pageSize }),
        ...(page && pageSize && { skip: calculatePagination(page, pageSize) }),
        include: {
          TypeCourse: true,
          curriculum: true,
          PrevCourse: {
            include: {
              PrevCourse: prerequisite,
            },
          },
        },
      });
      console.log('course repo', course);

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
          deletedAt: null,
        },
        include: {
          TypeCourse: true,
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
          deletedAt: new Date(),
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
        deletedAt: null,
        typeCourseId: query.typecourseId,
        curriculumId: { in: query.curriculumId },
        // ...(query.searchByTypeCourse && {
      },
    });
  }
}
