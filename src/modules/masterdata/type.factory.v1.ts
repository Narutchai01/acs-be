import { Injectable } from '@nestjs/common';
import { TypeDto } from './dto/type.v1.dto';
import { TypeModel } from 'src/models/type';

@Injectable()
export class TypeFactoryV1 {
  mapTypeModelsToDtos(data: TypeModel[]): TypeDto[] {
    return data.map((item) => this.mapTypeModelToDto(item));
  }

  mapTypeModelToDto(data: TypeModel): TypeDto {
    return {
      id: data.id,
      name: data.name,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
    };
  }
}
