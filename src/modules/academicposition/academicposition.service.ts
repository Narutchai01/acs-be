import { Injectable } from '@nestjs/common';
import { IAcademicPositionRepository } from 'src/repositories/academicposition/academicposition.abstract';

@Injectable()
export class AcademicPositionService {
  constructor(
    private academicPositionRepository: IAcademicPositionRepository,
  ) {}

  async getAcademicPosition() {
    return this.academicPositionRepository.getAcademicPosition();
  }
}
