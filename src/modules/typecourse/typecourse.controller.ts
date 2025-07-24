import { Controller, Get, HttpStatus } from '@nestjs/common';
import { TypecourseService } from './typecourse.service';
import { TypeCourseFactory } from './typecourse.factory';
import { Response } from 'express';

@Controller('typecourse')
export class TypecourseController {
  constructor(
    private readonly typecourseService: TypecourseService,
    private readonly typecourseFactory: TypeCourseFactory,
  ) {}

  @Get()
  async getTypeCourse() {
    const data = await this.typecourseService.getTypeCourse();
    const dto =
      this.typecourseFactory.mapTypeCourseModelsToTypeCourseDtos(data);

    return {
      statusCode: HttpStatus.OK,
      data: dto,
    };
  }
}
