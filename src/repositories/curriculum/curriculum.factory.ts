import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CurriculumEntity } from 'src/entities/curriculum.entity';
import { CurriculumModel } from 'src/models/curriculum';
import { CourseFactory } from '../course/course.factory';

@Injectable()
export class CurriculumFactory {
  constructor(
    @Inject(forwardRef(() => CourseFactory))
    private courseFactory: CourseFactory,
  ) {}

  mapCurriculumEntitiesToCurriculumModels(
    data: CurriculumEntity[],
  ): CurriculumModel[] {
    return data.map((curriculum) =>
      this.mapCurriculumEntityToCurriculumModel(curriculum),
    );
  }

  mapCurriculumEntityToCurriculumModel(
    data: CurriculumEntity,
  ): CurriculumModel {
    return {
      ...data,
      deletedAt: data.deletedAt ?? undefined,
      courses: data.courses
        ? this.courseFactory.mapCourseEntitiesToCourseModels(data.courses)
        : [],
    };
  }
}
