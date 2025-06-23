import { Injectable } from '@nestjs/common';
import { ListTypeModel, TypeModel } from 'src/models/type';
import { ListTypeDto, TypeDto } from './dto/type.dto';

@Injectable()
export class TypeFactory {
  constructor() {}

  mapTypeModelsToTypeDtos(data: TypeModel[]): TypeDto[] {
    return data.map((item) => this.mapTypeModelToTypeDto(item));
  }

  mapTypeModelToTypeDto(data: TypeModel): TypeDto {
    const dto = {
      id: data.id,
      name: data.name,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
    };
    return dto;
  }

  mapListTypeModelsToListTypeDtos(data: ListTypeModel[]): ListTypeDto[] {
    return data.map((item) => this.mapListTypeModelToListTypeDto(item));
  }

  mapListTypeModelToListTypeDto(data: ListTypeModel): ListTypeDto {
    const dto: ListTypeDto = {
      id: data.id,
      name: data.name,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
    };
    return dto;
  }
}
