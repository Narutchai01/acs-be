import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AcademicPositionService } from './academicposition.service';
import { AcademicPositionFactory } from './academicposition.factory';

@Controller('academicposition')
export class AcademicPositionController {
  constructor(
    private readonly AcademicPositionService: AcademicPositionService,
    private readonly AcademicPositionFactory: AcademicPositionFactory,
  ) {}

  @Get()
  async getAcademicPosition() {
    const data = await this.AcademicPositionService.getAcademicPosition();
    const dto =
      this.AcademicPositionFactory.mapAcademicPositionModelsToAcademicPositionDtos(
        data,
      );

    return {
      statusCode: HttpStatus.OK,
      data: dto,
    };
  }
}
