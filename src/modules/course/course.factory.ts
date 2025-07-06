import { Injectable } from '@nestjs/common';
import { CourseModel } from 'src/models/course';
import { CourseDto } from 'src/modules/course/dto/course.dto';

@Injectable()
export class CourseFactory {
  constructor() {}

  mapCourseModelsToCourseDtos(data: CourseModel[]): CourseDto[] {
    return data.map((data) => this.mapCourseModelToCourseDto(data));
  }

  mapCourseModelToCourseDto(data: CourseModel): CourseDto {
    const dto = {
      id: data.id,
      courseId: data.courseId,
      courseNameTh: data.courseNameTh,
      courseNameEn: data.courseNameEn,
      credits: data.credits,
      courseDetail: data.courseDetail,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    };

    return dto;
  }
}
