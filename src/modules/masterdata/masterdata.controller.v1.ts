import { Controller, Get, HttpStatus } from '@nestjs/common';
import { MajorPositionService } from '../majorposition/majorposition.service';
import { MajorPositionFactory } from '../majorposition/majorposition.factory';
import { ResponseDto } from 'src/models/dto/base.dto';
import { MajorPositionDto } from '../majorposition/dto/majorposition.v1.dto';

@Controller({ path: 'master-data', version: '1' })
export class MasterdataController {
  constructor(
    private readonly majorPositionService: MajorPositionService,
    private readonly majorPositionFactory: MajorPositionFactory,
  ) {}

  @Get()
  getMasterData() {
    return {
      statusCode: HttpStatus.OK,
      data: 'Master data retrieved successfully',
    };
  }

  @Get('/major-positions')
  async getMajorPosition(): Promise<ResponseDto<MajorPositionDto[]>> {
    const position = await this.majorPositionService.getMajorPosition();
    const dto =
      this.majorPositionFactory.mapMajorPositionModelsToDtos(position);
    return {
      statusCode: HttpStatus.OK,
      data: dto,
    };
  }
}
