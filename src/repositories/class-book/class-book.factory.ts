import { Injectable } from '@nestjs/common';
import { ClassBookEntity } from 'src/entities/class-book.entity';
import { ClassBookModel } from 'src/models/class-book';

@Injectable()
export class ClassBookFactory {
  constructor() {}

  mapEntityToModel(entity: ClassBookEntity): ClassBookModel {
    return {
      id: entity.id,
      classof: entity.classof,
      image: entity.image,
      firstYearAcademic: entity.firstYearAcademic,
      curriculumId: entity.curriculumId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ? entity.deletedAt : null,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
      student: [],
    };
  }

  mapEntitiesToModels(entities: ClassBookEntity[]): ClassBookModel[] {
    return entities?.map((e) => this.mapEntityToModel(e)) ?? [];
  }
}
