import { Injectable } from '@nestjs/common';
import { MajorPositionModel } from 'src/models/majorposition';
import { MajorPositionDto } from './dto/majorposition.v1.dto';
import { RoleModel } from 'src/models/role';
import { RoleDto } from './dto/role.v1.dto';
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

  mapRoleModelToRoleDto(data: RoleModel): RoleDto {
    return {
      id: data.id,
      name: data.name,
    };
  }

  mapTypeCourseModelsToTypeCourseDtos(
    data: TypeCourseModel[],
  ): TypeCourseDto[] {
    return data.map((item) => this.mapTypeCourseModelToTypeCourseDto(item));
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
