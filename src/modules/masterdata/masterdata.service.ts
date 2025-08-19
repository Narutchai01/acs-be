import { Injectable } from '@nestjs/common';
import { IMajorPositionRepository } from 'src/repositories/majorposition/majorposition.abstract';
import { MajorPositionModel } from 'src/models/majorposition';
import { AcademicPositionModel } from 'src/models/academicposition';
import { IAcademicPositionRepository } from 'src/repositories/academicposition/academicposition.abstract';

@Injectable()
export class MasterdataService {
  constructor(
    private majorPositionRepository: IMajorPositionRepository,
    private academicPositionRepository: IAcademicPositionRepository,
  ) {}

  async getMajorPosition(): Promise<MajorPositionModel[]> {
    return await this.majorPositionRepository.get();
  }

  async getAcademicPosition(): Promise<AcademicPositionModel[]> {
    return this.academicPositionRepository.getAcademicPosition();
  }
}
