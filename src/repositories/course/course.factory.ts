import { Injectable } from '@nestjs/common';
import { UserFactory } from '../user/user.factory';
import { CourseEntity, TypeCourseEntity } from 'src/entities/course.entity';
import { CourseModel, TypeCourseModel } from 'src/models/course';

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
      typeCourseId: data.typeCourseId,
      courseNameTh: data.courseNameTh,
      courseNameEn: data.courseNameEn,
      credits: data.credits,
      courseDetail: data.courseDetail,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      user: this.userFactory.mapUserEntityToUserModel(data.user),
    };

    return courseModel;
  }

  mapTypeCourseEntitiesToTypeCourseModels(
    entities: TypeCourseEntity[],
  ): TypeCourseModel[] {
    return entities.map((entity) =>
      this.mapTypeCourseEntityToTypeCourseModel(entity),
    );
  }

  mapTypeCourseEntityToTypeCourseModel(
    data: TypeCourseEntity,
  ): TypeCourseModel {
    const typeCourseModel = {
      id: data.id,
      name: data.name,
      description: data.description,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
    };

    return typeCourseModel;
  }
}
