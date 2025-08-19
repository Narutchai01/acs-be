import { Injectable } from '@nestjs/common';
import { MajorPositionModel } from 'src/models/majorposition';
import { MajorPositionDto } from './dto/majorposition.v1.dto';
import { ListTypeModel } from 'src/models/type';
import { ListTypeDto } from './dto/typelist.v1.dto';
import { RoleModel } from 'src/models/role';
import { RoleDto } from './dto/role.v1.dto';
import { EducationLevelModel } from 'src/models/educationlavel';
import { EducationLevelDto } from './dto/educationlevel.v1.dto';
import { TypeDto } from './dto/type.v1.dto';
import { TypeModel } from 'src/models/type';

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

  mapRoleModelsToDtos(data: RoleModel[]): RoleDto[] {
    return data.map((item) => this.mapRoleModelToRoleDto(item));
  }

  mapRoleModelToRoleDto(data: RoleModel): RoleDto {
    return {
      id: data.id,
      name: data.name,
    };
  }

  mapEducationModelsToDtos(
    educationLevels: EducationLevelModel[],
  ): EducationLevelDto[] {
    return educationLevels.map((educationLevel) =>
      this.mapEducationModelToDto(educationLevel),
    );
  }

  mapEducationModelToDto(
    educationLevel: EducationLevelModel,
  ): EducationLevelDto {
    return {
      id: educationLevel.id,
      level: educationLevel.level,
      createdDate: educationLevel.createdDate,
      updatedDate: educationLevel.updatedDate,
    };
  }

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
