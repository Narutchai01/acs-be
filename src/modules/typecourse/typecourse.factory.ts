import { Injectable } from '@nestjs/common';
import { TypeCourseDto } from './dto/typecourse.dto';
import { TypeCourseModel } from 'src/models/course';

@Injectable()
export class TypeCourseFactory {
  constructor() {}

  mapTypeCourseModelsToTypeCourseDtos(
    data: TypeCourseModel[],
  ): TypeCourseDto[] {
    return data.map((entity) => this.mapTypeCourseModelToTypeCourseDto(entity));
  }

  mapTypeCourseModelToTypeCourseDto(data: TypeCourseModel): TypeCourseDto {
    const dto: TypeCourseDto = {
      id: data.id,
      name: data.name,
      description: data.description,
    };
    return dto;
  }
}
