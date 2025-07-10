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
      id: data.id,
      year: data.year,
      fileUrl: data.fileUrl,
      imageUrl: data.imageUrl,
      description: data.description,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
      deletedDate: data.deletedDate,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      courses: data.courses
        ? this.courseFactory.mapCourseEntitiesToCourseModels(data.courses)
        : [],
    };
  }
}
