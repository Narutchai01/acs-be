import { AcademicPositionModel } from 'src/models/academicposition';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IAcademicPositionRepository {
  abstract getAcademicPosition(): Promise<AcademicPositionModel[]>;
}
