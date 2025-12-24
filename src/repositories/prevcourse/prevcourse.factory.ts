import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrevCourseEntity } from 'src/entities/prevcours.entity';
import { PrevCourseModel } from 'src/models/prevcourse';
import { CourseFactory } from '../course/course.factory';

@Injectable()
export class PrevCourseFactory {
  constructor(
    @Inject(forwardRef(() => CourseFactory))
    private courseFactory: CourseFactory,
  ) {}

  mapPrevCourseEntitiseToPrevCourseModels(
    data: PrevCourseEntity[],
  ): PrevCourseModel[] {
    return data.map((entity) =>
      this.mapPrevCourseEntityToPrevCourseModel(entity),
    );
  }

  mapPrevCourseEntityToPrevCourseModel(
    data: PrevCourseEntity,
  ): PrevCourseModel {
    return {
      id: data.id,
      courseId: data.courseId,
      prevCourseId: data.prevCourseId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      PrevCourse: data.PrevCourse
        ? this.courseFactory.mapCourseEntityToCourseModel(data.PrevCourse)
        : null,
      Course: data.Course
        ? this.courseFactory.mapCourseEntityToCourseModel(data.Course)
        : null,
    };
  }
}
