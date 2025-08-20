import { Injectable } from '@nestjs/common';
import { MajorPositionModel } from 'src/models/majorposition';
import { MajorPositionDto } from './dto/majorposition.v1.dto';
import { RoleModel } from 'src/models/role';
import { RoleDto } from './dto/role.v1.dto';
import { ListTypeModel } from 'src/models/type';
import { ListTypeDto } from './dto/typelist.v1.dto';
import { EducationLevelModel } from 'src/models/educationlavel';
import { EducationLevelDto } from './dto/educationlevel.v1.dto';
import { TypeModel } from 'src/models/type';
import { TypeDto } from './dto/type.v1.dto';
import { AcademicPositionModel } from 'src/models/academicposition';
import { AcademicPositionDto } from './dto/academicposition.v1.dto';
import { TypeCourseModel } from 'src/models/course';
import { TypeCourseDto } from './dto/typecourse.v1.dto';

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

  mapRoleModelsToRoleDtos(data: RoleModel[]): RoleDto[] {
    return data.map((item) => this.mapRoleModelToRoleDto(item));
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

  mapTypeCourseModelsToTypeCourseDtos(
    data: TypeCourseModel[],
  ): TypeCourseDto[] {
    return data.map((item) => this.mapTypeCourseModelToDto(item));
  }

  mapTypeCourseModelToDto(data: TypeCourseModel): TypeCourseDto {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
    };
  }

  mapAcademicPositionModelsToDtos(
    data: AcademicPositionModel[],
  ): AcademicPositionDto[] {
    return data.map((item) => this.mapAcademicPositionModelToDto(item));
  }

  mapAcademicPositionModelToDto(
    data: AcademicPositionModel,
  ): AcademicPositionDto {
    return {
      id: data.id,
      positionTh: data.positionTh,
      positionEn: data.positionEn,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
    };
  }
}
