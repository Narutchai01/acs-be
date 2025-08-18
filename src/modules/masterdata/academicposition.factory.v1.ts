import { Injectable } from '@nestjs/common';
import { AcademicPositionModel } from 'src/models/academicposition';
import { AcademicPositionDto } from './dto/academicposition.v1.dto';

@Injectable()
export class AcademicPositionFactoryV1 {
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
