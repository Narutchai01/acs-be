import { Controller, Get } from '@nestjs/common';
import { EducationlevelService } from './educationlevel.service';
import { EducationLevelFactory } from './educationlevel.factory';

@Controller('educationlevel')
export class EducationlevelController {
  constructor(
    private readonly educationlevelService: EducationlevelService,
    private readonly educationLevelFactory: EducationLevelFactory,
  ) {}

  @Get()
  async getEducationLevels() {
    const dataEducationLevels =
      await this.educationlevelService.getEducationLevels();

    const dto =
      this.educationLevelFactory.mapEducationModelsToDtos(dataEducationLevels);

    return {
      statusCode: 200,
      data: dto,
    };
  }
}
