import { Injectable } from '@nestjs/common';
import { PrevCourseEntity } from 'src/entities/prevcours.entity';
import { PrevCourseModel } from 'src/models/prevcourse';
import { CourseFactory } from '../course/course.factory';

@Injectable()
export class PrevCourseFactory {
  constructor(private courseFactory: CourseFactory) {}

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
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
      deletedDate: data.deletedDate,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      PrevCourse: this.courseFactory.mapCourseEntityToCourseModel(
        data.PrevCourse,
      ),
      Course: this.courseFactory.mapCourseEntityToCourseModel(data.Course),
    };
  }
}
