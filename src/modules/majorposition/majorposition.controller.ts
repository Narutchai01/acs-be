import { Get, Controller } from '@nestjs/common';
import { MajorPositionService } from './majorposition.service';
import { MajorPositionModel } from 'src/models/majorposition';
import { MajorPositionFactory } from './majorposition.factory';

@Controller('majorposition')
export class MajorPositionController {
  constructor(
    private readonly majorPositionService: MajorPositionService,
    private readonly majorPositionFactory: MajorPositionFactory,
  ) {}

  @Get()
  async getMajorPosition(): Promise<MajorPositionModel[]> {
    const majorPosition = await this.majorPositionService.getMajorPosition();
    if (majorPosition instanceof Error) {
      throw majorPosition;
    }
    return this.majorPositionFactory.mapMajorPositionModelsToDtos(majorPosition);
  }
}
