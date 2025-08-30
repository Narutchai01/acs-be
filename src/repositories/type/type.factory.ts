import { Injectable } from '@nestjs/common';
import { ListTypeEntity, TypeEntity } from 'src/entities/type.entity';
import { ListTypeModel, TypeModel } from 'src/models/type';

@Injectable()
export class TypeFactory {
  constructor() {}

  mapTypeEntitiesToTypeModels(data: TypeEntity[]): TypeModel[] {
    return data.map((type) => this.mapTypeEntityToTypeModel(type));
  }

  mapTypeEntityToTypeModel(data: TypeEntity): TypeModel {
    return {
      id: data.id,
      name: data.name,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  mapListTypeEntitiesToListTypeModels(data: ListTypeEntity[]): ListTypeModel[] {
    return data.map((type) => this.mapListTypeEntityToListTypeModel(type));
  }

  mapListTypeEntityToListTypeModel(data: ListTypeEntity): ListTypeModel {
    return {
      id: data.id,
      name: data.name,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
