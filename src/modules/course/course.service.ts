import { Injectable } from '@nestjs/common';
import { ICourseRepository } from 'src/repositories/course/course.abstract';
import { CourseModel } from 'src/models/course';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course';

@Injectable()
export class CourseService {
  constructor(private courseRespository: ICourseRepository) { }

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

    return this.courseRespository.createCourse(data);
  }

  async updateCourse(
    id: number,
    updateCourse: UpdateCourseDTO,
    userId: number,
  ): Promise<CourseModel> {
    const existingCourse = await this.courseRespository.getCourseById(id);

    const updateData = {
      courseId: updateCourse.courseId || existingCourse.courseId,
      courseName: updateCourse.courseName || existingCourse.courseName,
      courseDetail: updateCourse.courseDetail || existingCourse.courseDetail,
      updateBy: userId,
    };

    return this.courseRespository.updateCourse(id, updateData);
  }
}
