import { Injectable } from '@nestjs/common';
import { IAcademicPositionRepository } from 'src/repositories/academicposition/academicposition.abstract';
import { AcademicPositionModel } from 'src/models/academicposition';

@Injectable()
export class AcademicPositionService {
  constructor(
    private academicPositionRepository: IAcademicPositionRepository,
  ) {}

  async getAcademicPosition(): Promise<AcademicPositionModel[]> {
    return this.academicPositionRepository.getAcademicPosition();
  }
}
