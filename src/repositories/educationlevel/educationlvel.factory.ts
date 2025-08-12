import { Injectable } from '@nestjs/common';
import { EducationLevelEntity } from 'src/entities/educationlavel.entity';
import { EducationLevelModel } from 'src/models/educationlavel';

@Injectable()
export class EducationLevelFactory {
  constructor() {}

  mapEducationLevelEntitiesToModels(
    data: EducationLevelEntity[],
  ): EducationLevelModel[] {
    return data.map((item) => this.mapEducationLevelEntityToModel(item));
  }

  mapEducationLevelEntityToModel(
    data: EducationLevelEntity,
  ): EducationLevelModel {
    return {
      id: data.id,
      level: data.level,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
    };
  }
}
