import { Injectable } from '@nestjs/common';
import { EducationLevelModel } from 'src/models/educationlavel';
import { IEducationLevelRepository } from 'src/repositories/educationlevel/educationlvel.abstract';

@Injectable()
export class EducationlevelService {
  constructor(private educationLevelRepository: IEducationLevelRepository) {}
  async getEducationLevels(): Promise<EducationLevelModel[]> {
    return this.educationLevelRepository.getEducationLevels();
  }
}
