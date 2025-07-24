import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserFactory } from '../user/user.factory';
import { CourseEntity, TypeCourseEntity } from 'src/entities/course.entity';
import { CourseModel, TypeCourseModel } from 'src/models/course';
import { CurriculumFactory } from '../curriculum/curriculum.factory';
import { PrevCourseFactory } from '../prevcourse/prevcourse.factory';

@Injectable()
export class CourseFactory {
  constructor(
    private userFactory: UserFactory,
    @Inject(forwardRef(() => CurriculumFactory))
    private curriculumFactory: CurriculumFactory,
    @Inject(forwardRef(() => PrevCourseFactory))
    private prevCourseFactory: PrevCourseFactory,
  ) {}

  mapCourseEntitiesToCourseModels(entities: CourseEntity[]): CourseModel[] {
    return entities.map((entity) => this.mapCourseEntityToCourseModel(entity));
  }

  mapCourseEntityToCourseModel(data: CourseEntity): CourseModel {
    const courseModel: CourseModel = {
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
      user: data.user
        ? this.userFactory.mapUserEntityToUserModel(data.user)
        : null,
      curriculum: data.curriculum
        ? this.curriculumFactory.mapCurriculumEntityToCurriculumModel(
            data.curriculum,
          )
        : null,
      PrevCourse: data.PrevCourse
        ? this.prevCourseFactory.mapPrevCourseEntitiseToPrevCourseModels(
            data.PrevCourse,
          )
        : [],
      PrereqisiteFor: data.PrerequisiteFor
        ? this.prevCourseFactory.mapPrevCourseEntitiseToPrevCourseModels(
            data.PrerequisiteFor,
          )
        : [],
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
