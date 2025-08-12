import { Injectable } from '@nestjs/common';
import { EducationLevelModel } from 'src/models/educationlavel';

@Injectable()
export abstract class IEducationLevelRepository {
  abstract getEducationLevels(): Promise<EducationLevelModel[]>;
}
