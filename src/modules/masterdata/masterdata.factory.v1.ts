import { Injectable } from '@nestjs/common';
import { MajorPositionModel } from 'src/models/majorposition';
import { MajorPositionDto } from './dto/majorposition.v1.dto';
import { AcademicPositionModel } from 'src/models/academicposition';
import { AcademicPositionDto } from './dto/academicposition.v1.dto';

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
