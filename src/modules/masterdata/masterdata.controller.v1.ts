import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { MasterdataService } from './masterdata.service';
import { MasterDataFactoryV1 } from './masterdata.factory.v1';
import { MajorPositionDto } from './dto/majorposition.v1.dto';
import { success } from 'src/core/interceptors/response.helper';
import { ListTypeDto } from './dto/typelist.v1.dto';
import { RoleDto } from './dto/role.v1.dto';
import { EducationLevelDto } from './dto/educationlevel.v1.dto';

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

  @Get('type/list')
  async getListType(@Query('type') type: string) {
    const types = await this.masterDataService.getListType(type);
    const dto = this.masterDataFactory.mapListTypeModelsToListTypeDtos(types);
    return success<ListTypeDto[]>(dto, HttpStatus.OK);
  }

  @Get('/roles')
  async getRole() {
    const roles = await this.masterDataService.getRole();
    const dto = this.masterDataFactory.mapRoleModelsToDtos(roles);
    return success<RoleDto[]>(dto, HttpStatus.OK);
  }

  @Get('/educationlevel')
  async getEducationLevels() {
    const dataEducationLevels =
      await this.masterDataService.getEducationLevels();
    const dto =
      this.masterDataFactory.mapEducationModelsToDtos(dataEducationLevels);
    return success<EducationLevelDto[]>(dto, HttpStatus.OK);
  }
}
