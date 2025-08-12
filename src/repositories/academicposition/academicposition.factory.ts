import { Injectable } from '@nestjs/common';
import { AcademicPositionEntity } from 'src/entities/academicposition.entity';
import { AcademicPositionModel } from 'src/models/academicposition';

@Injectable()
export class AcademicPositionFactory {
  constructor() {}

  mapAcademicPositionEntitiesToAcademicPositionModels(
    data: AcademicPositionEntity[],
  ): AcademicPositionModel[] {
    return data.map((academicposition) =>
      this.mapAcademicPositionEntityToAcademicPositionModel(academicposition),
    );
  }

  mapAcademicPositionEntityToAcademicPositionModel(
    data: AcademicPositionEntity,
  ): AcademicPositionModel {
    return {
      id: data.id,
      positionTh: data.positionTh,
      positionEn: data.positionEn,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
    };
  }
}
