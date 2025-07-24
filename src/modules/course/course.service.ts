import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ICourseRepository } from 'src/repositories/course/course.abstract';
import { CourseModel, UpdateCourseModel } from 'src/models/course';
import { CreateCourseDto } from './dto/create-course.dto';
import { IPrevCourseRepository } from 'src/repositories/prevcourse/prevcourse.abstract';
import { QueryCourseDto } from './dto/get-course.dto';
import { Pageable } from 'src/models';
import { UpdateCourseDto } from './dto/update-course.dto';

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

    let course: CourseModel;
    try {
      course = await this.courseRepository.createCourse(data);

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
          createdBy: userId,
          updatedBy: userId,
        }));

        const prevCourseCreated =
          await this.prevCourseRepository.create(prevCourses);

        if (!prevCourseCreated) {
          throw new HttpException(
            'Failed to create prerequisite courses',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }

      course = await this.courseRepository.getCourseById(course.id);
      return course;
    } catch (error) {
      console.error('Course creation failed:', error);
      throw new HttpException(
        'Failed to create course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: number): Promise<CourseModel> {
    try {
      const course = await this.courseRepository.getCourseById(id);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      return course;
    } catch (error) {
      console.error('Get course by ID failed:', error);
      throw new HttpException(
        'Failed to get course by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getList(query: QueryCourseDto): Promise<Pageable<CourseModel>> {
    try {
      const { page, pageSize } = query;
      const [rows, count] = await Promise.all([
        this.courseRepository.getCourse(query),
        this.courseRepository.count(query),
      ]);
      return {
        rows: rows,
        totalRecords: count,
        page,
        pageSize,
      };
    } catch (error) {
      console.error('Get course list failed:', error);
      throw new HttpException(
        'Failed to get course list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateCourse(
    body: UpdateCourseDto,
    id: number,
    updatedBy: number,
  ): Promise<CourseModel> {
    const existingCourse = await this.courseRepository.getCourseById(id);

    if (!existingCourse) {
      throw new HttpException(
        `Not found Course Id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const dataUpdate: UpdateCourseModel = {
      courseId: body.courseId || existingCourse.courseId,
      curriculumId: body.curriculumId || existingCourse.curriculumId,
      typeCourseId: body.typeCourseId || existingCourse.typeCourseId,
      courseNameTh: body.courseNameTh || existingCourse.courseNameTh,
      courseNameEn: body.courseNameEn || existingCourse.courseNameEn,
      credits: body.credits || existingCourse.credits,
      courseDetail: body.courseDetail || existingCourse.courseDetail,
      updatedBy: updatedBy,
    };

    const result = await this.courseRepository.updateCourse(id, dataUpdate);

    if (!result) {
      throw new HttpException(
        'Failed to update course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result;
  }

  async deleteCoruse(id: number, updateBy: number): Promise<CourseModel> {
    let course = await this.courseRepository.getCourseById(id);
    if (!course) {
      throw new HttpException(
        `Not found Course Id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    course = await this.courseRepository.deleteCourse(id, updateBy);
    if (!course) {
      throw new HttpException(
        'Failed to delete course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return course;
  }
}
