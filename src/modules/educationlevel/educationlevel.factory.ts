import { Injectable } from '@nestjs/common';
import { EducationLevelModel } from 'src/models/educationlavel';
import { EducationLevelDto } from './dto/educationlevel.dto';

@Injectable()
export class EducationLevelFactory {
  constructor() {}

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
}
