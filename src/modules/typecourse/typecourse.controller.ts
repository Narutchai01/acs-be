import { Controller, Get, Res } from '@nestjs/common';
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
  async getTypeCourse(@Res() res: Response) {
    const data = await this.typecourseService.getTypeCourse();
    const dto =
      this.typecourseFactory.mapTypeCourseModelsToTypeCourseDtos(data);

    return res.status(200).json({
      status: true,
      data: dto,
      error: null,
    });
  }
}
