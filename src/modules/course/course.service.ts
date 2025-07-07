import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ICourseRepository } from 'src/repositories/course/course.abstract';
import { CourseModel } from 'src/models/course';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { QueryCourseDto } from './dto/get-course.dto';
import { Pageable } from 'src/models';
import { IPrevCourseRepository } from 'src/repositories/prevcourse/prevcourse.abstract';

@Injectable()
export class CourseService {
  constructor(
    private courseRepository: ICourseRepository,
    private prevCourseRepository: IPrevCourseRepository,
  ) {}

  async createCourse(
    createCourse: CreateCourseDto,
    userId: number,
  ): Promise<CourseModel> {
    const data = {
      courseId: createCourse.courseId,
      typeCourseId: createCourse.typeCourseId,
      courseNameTh: createCourse.courseNameTh,
      courseNameEn: createCourse.courseNameEn,
      credits: createCourse.credits,
      courseDetail: createCourse.courseDetail,
      curriculumId: createCourse.curriculumId,
      createdBy: userId,
      updatedBy: userId,
    };

    const { prerequisites } = createCourse;

    const course = await this.courseRepository.createCourse(data);

    if (!course) {
      throw new HttpException(
        'Failed to create course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (prerequisites && prerequisites.length > 0) {
      const prevCourses = prerequisites.map((prevCourse) => ({
        courseId: course.id,
        prevCourseId: prevCourse,
        createDate: new Date(),
        updateDate: new Date(),
        createBy: userId,
        updateBy: userId,
        createdBy: userId,
        updatedBy: userId,
      }));

      await Promise.all(
        prevCourses.map((prevCourse) =>
          this.prevCourseRepository.create(prevCourse),
        ),
      );
    }

    return course;
  }

  async getCourse(query: QueryCourseDto): Promise<Pageable<CourseModel>> {
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
      typeCourseId:
        (updateCourse.typeCourseId ?? existingCourse.typeCourseId) || 0,
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
