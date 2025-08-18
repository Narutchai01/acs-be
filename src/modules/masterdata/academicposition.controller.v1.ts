import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AcademicPositionService } from './academicposition.service';
import { AcademicPositionFactoryV1 } from './academicposition.factory.v1';
import { AcademicPositionDto } from './dto/academicposition.v1.dto';
import { success } from 'src/core/interceptors/response.helper';

@Controller({
  path: 'academic-position',
  version: '1',
})
export class AcademicPositionControllerV1 {
  constructor(
    private academicPositionService: AcademicPositionService,
    private academicPositionFactory: AcademicPositionFactoryV1,
  ) {}

  @Get('/academic-positions')
  async getAcademicPosition() {
    const academicPositions =
      await this.academicPositionService.getAcademicPosition();
    const dto =
      this.academicPositionFactory.mapAcademicPositionModelsToDtos(
        academicPositions,
      );
    return success<AcademicPositionDto[]>(dto, HttpStatus.OK);
  }
}
