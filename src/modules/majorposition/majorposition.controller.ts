import { Get, Controller, HttpStatus } from '@nestjs/common';
import { MajorPositionService } from './majorposition.service';
import { MajorPositionFactory } from './majorposition.factory';
import { ResponseDto } from 'src/models/dto/base.dto';
import { MajorPositionDto } from './dto/majorposition.dto';

@Controller('majorposition')
export class MajorPositionController {
  constructor(
    private readonly majorPositionService: MajorPositionService,
    private readonly majorPositionFactory: MajorPositionFactory,
  ) {}
  @Get()
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
