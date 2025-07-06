import { Injectable } from '@nestjs/common';
import { ICourseRepository } from 'src/repositories/course/course.abstract';
import { CourseModel } from 'src/models/course';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { QueryCourseDto } from './dto/get-course.dto';
import { Pageable } from 'src/models';

@Injectable()
export class CourseService {
  constructor(private courseRepository: ICourseRepository) {}

  async createCourse(
    createCourse: CreateCourseDto,
    userId: number,
  ): Promise<CourseModel> {
    const data = {
      courseId: createCourse.courseId,
      courseNameTh: createCourse.courseNameTh,
      courseNameEn: createCourse.courseNameEn,
      credits: createCourse.credits,
      courseDetail: createCourse.courseDetail,
      createdBy: userId,
      updatedBy: userId,
    };

    return this.courseRepository.createCourse(data);
  }

  async getCourse(query: QueryCourseDto): Promise<Pageable<CourseModel>> {
    try {
      const { page, pageSize } = query;
      const [rows, count] = await Promise.all([
        this.courseRepository.getCourse(query),
        this.courseRepository.count(),
      ]);
      return {
        totalRecords: count,
        rows: rows,
        page: page,
        pageSize: pageSize,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Get course failed:', error.message);
        throw new Error(`Unable to get courses: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        throw new Error('Unable to get courses: Unknown error occurred');
      }
    }
  }

  async getCourseById(id: number): Promise<CourseModel> {
    return await this.courseRepository.getCourseById(id);
  }

  async updateCourse(
    id: number,
    updateCourse: UpdateCourseDto,
    userId: number,
  ): Promise<CourseModel> {
    const existingCourse = await this.courseRepository.getCourseById(id);

    const updateData = {
      courseId: updateCourse.courseId || existingCourse.courseId,
      courseNameTh: updateCourse.courseNameTh || existingCourse.courseNameTh,
      courseNameEn: updateCourse.courseNameEn || existingCourse.courseNameEn,
      credits: updateCourse.credits || existingCourse.credits,
      courseDetail: updateCourse.courseDetail || existingCourse.courseDetail,
      updatedBy: userId,
    };

    return this.courseRepository.updateCourse(id, updateData);
  }

  async deleteCourse(id: number, userId: number): Promise<CourseModel> {
    const existingCourse = await this.courseRepository.getCourseById(id);
    if (!existingCourse) {
      throw new Error(`Course with ID ${id} not found`);
    }
    return await this.courseRepository.deleteCourse(id, userId);
  }
}
