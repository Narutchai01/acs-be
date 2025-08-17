import { Controller, Get, HttpStatus } from '@nestjs/common';
import { MasterdataService } from './masterdata.service';
import { MasterDataFactoryV1 } from './masterdata.factory.v1';
import { MajorPositionDto } from './dto/majorposition.v1.dto';
import { success } from 'src/core/interceptors/response.helper';

@Controller({
  path: 'master-data',
  version: '1',
})
export class MasterdataControllerV1 {
  constructor(
    private readonly masterDataService: MasterdataService,
    private readonly masterDataFactory: MasterDataFactoryV1,
  ) {}

  @Get('/major-positions')
  async getMajorPosition() {
    const majorPositions = await this.masterDataService.getMajorPosition();
    const dto =
      this.masterDataFactory.mapMajorPositionModelsToDtos(majorPositions);
    return success<MajorPositionDto[]>(dto, HttpStatus.OK);
  }
}
