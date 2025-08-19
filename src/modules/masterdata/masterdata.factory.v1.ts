import { Injectable } from '@nestjs/common';
import { MajorPositionModel } from 'src/models/majorposition';
import { MajorPositionDto } from './dto/majorposition.v1.dto';
import { RoleModel } from 'src/models/role';
import { RoleDto } from './dto/role.v1.dto';
import { TypeCourseModel } from 'src/models/course';
import { TypeCourseDto } from './dto/typecourse.v1.dto';
import { ListTypeModel } from 'src/models/type';
import { ListTypeDto } from './dto/typelist.v1.dto';

@Injectable()
export class MasterDataFactoryV1 {
  mapMajorPositionModelsToDtos(data: MajorPositionModel[]): MajorPositionDto[] {
    return data.map((item) => this.mapMajorPositionModelToDto(item));
  }
  mapMajorPositionModelToDto(data: MajorPositionModel): MajorPositionDto {
    return {
      id: data.id,
      positionTh: data.positionTh,
      positionEn: data.positionEn,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
    };
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