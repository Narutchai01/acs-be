import { Injectable } from '@nestjs/common';
import { CourseModel } from 'src/models/course';
import { CourseDto } from 'src/modules/course/dto/course.dto';
import { CurriculumFactory } from '../curriculum/curriculum.factory';
import { MasterDataFactoryV1 } from '../masterdata/masterdata.factory.v1';

@Injectable()
export class CourseFactory {
  constructor(
    private curriculumFactory: CurriculumFactory,
    private masterDataFactoryV1: MasterDataFactoryV1,
  ) {}

  mapCourseModelsToCourseDtos(data: CourseModel[]): CourseDto[] {
    return data.map((data) => this.mapCourseModelToCourseDto(data));
  }

  mapCourseModelToCourseDto(data: CourseModel): CourseDto {
    const dto: CourseDto = {
      id: data.id,
      courseId: data.courseId,
      courseNameTh: data.courseNameTh,
      courseNameEn: data.courseNameEn,
      credits: data.credits,
      courseDetail: data.courseDetail,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      typeCourse: data.typeCourse
        ? this.masterDataFactoryV1.mapTypeCourseModelToDto(data.typeCourse)
        : null,

      curriculum: data.curriculum
        ? this.curriculumFactory.mapCurriculumModelToCurriculumDto(
            data.curriculum,
          )
        : null,
      preCourses:
        data.PrevCourse && data.PrevCourse.length > 0
          ? data.PrevCourse.map((prevcourse) =>
              prevcourse.PrevCourse
                ? this.mapCourseModelToCourseDto(prevcourse.PrevCourse)
                : null,
            ).filter((course): course is CourseDto => course !== null)
          : [],
    };

    return dto;
  }
}
