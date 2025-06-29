import { Injectable } from '@nestjs/common';
import { UserFactory } from '../user/user.factory';
import { CourseEntity } from 'src/entities/course.entity';
import { CourseModel } from 'src/models/course';

@Injectable()
export class CourseFactory {
  constructor(private userFactory: UserFactory) {}

  mapCourseEntitiesToCourseModels(entities: CourseEntity[]): CourseModel[] {
    return entities.map((entity) => this.mapCourseEntityToCourseModel(entity));
  }

  mapCourseEntityToCourseModel(data: CourseEntity): CourseModel {
    const courseModel = {
      id: data.id,
      courseId: data.courseId,
      courseName: data.courseName,
      courseDetail: data.courseDetail,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      user: this.userFactory.mapUserEntityToUserModel(data.user),
    };

    return courseModel;
  }
}
