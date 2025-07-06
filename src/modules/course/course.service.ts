import { Injectable } from '@nestjs/common';
import { ICourseRepository } from 'src/repositories/course/course.abstract';
import { CourseModel } from 'src/models/course';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
@Injectable()
export class CourseService {
  constructor(private courseRepository: ICourseRepository) {}

  async createCourse(
    createCourse: CreateCourseDto,
    userId: number,
  ): Promise<CourseModel> {
    const data = {
      courseId: createCourse.courseId,
      courseName: createCourse.courseName,
      courseDetail: createCourse.courseDetail,
      createdBy: userId,
      updatedBy: userId,
    };

    return this.courseRepository.createCourse(data);
  }

  async getCourse(): Promise<CourseModel[]> {
    try {
      const course = await this.courseRepository.getCourse();

      if (!course || course.length === 0) {
        console.warn('No course found in the system');
      }

      return course;
    } catch (error: unknown) {
      console.error(
        'Course service: Failed to retrieve course catalog:',
        error,
      );
      throw new Error(
        'Course catalog is temporarily unavailable. Please try again later.',
      );
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
      courseName: updateCourse.courseName || existingCourse.courseName,
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
