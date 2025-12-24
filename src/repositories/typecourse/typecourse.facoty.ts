import { Injectable } from '@nestjs/common';
import { TypeCourseEntity } from 'src/entities/course.entity';
import { TypeCourseModel } from 'src/models/course';

@Injectable()
export class TypeCourseFactory {
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
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    return typeCourseModel;
  }
}
