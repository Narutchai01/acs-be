import { Get, Controller, Query } from '@nestjs/common';
import { MajorPositionService } from './majorposition.service';
import { MajorPositionModel } from 'src/models/majorposition';
import { MajorPositionFactory } from './majorposition.factory';
import { QueryMajorPositionDto } from './dto/query-majorposition.dto';

@Controller('majorposition')
export class MajorPositionController {
  constructor(
    private readonly majorPositionService: MajorPositionService,
    private readonly majorPositionFactory: MajorPositionFactory,
  ) {}
  @Get()
  async getMajorPosition(
    @Query() query: QueryMajorPositionDto,
  ): Promise<MajorPositionModel[]> {
    const majorPosition =
      await this.majorPositionService.getMajorposition(query);
    if (majorPosition instanceof Error) {
      throw majorPosition;
    }
    return this.majorPositionFactory.mapMajorPositionModelsToDtos(
      majorPosition,
    ) as MajorPositionModel[];
  }
}
