import { Injectable } from '@nestjs/common';
import { AcademicPositionDto } from './dto/academicposition.dto';
import { AcademicPositionModel } from 'src/models/academicposition';

@Injectable()
export class AcademicPositionFactory {
  constructor() {}

  mapAcademicPositionModelsToAcademicPositionDtos(
    data: AcademicPositionModel[],
  ): AcademicPositionDto[] {
    return data.map((entity) =>
      this.mapAcademicPositionModelToAcademicPositionDto(entity),
    );
  }

  mapAcademicPositionModelToAcademicPositionDto(
    data: AcademicPositionModel,
  ): AcademicPositionDto {
    const dto: AcademicPositionDto = {
      id: data.id,
      positionTh: data.positionTh,
      positionEn: data.positionEn,
    };
    return dto;
  }
}
