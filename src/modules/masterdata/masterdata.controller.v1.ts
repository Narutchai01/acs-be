import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { MasterdataService } from './masterdata.service';
import { MasterDataFactoryV1 } from './masterdata.factory.v1';
import { MajorPositionDto } from './dto/majorposition.v1.dto';
import { RoleDto } from './dto/role.v1.dto';
import { TypeCourseDto } from './dto/typecourse.v1.dto';
import { success } from 'src/core/interceptors/response.helper';
import { TypeDto } from './dto/type.v1.dto';
import { ListTypeDto } from './dto/typelist.v1.dto';

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

  @Get('/type')
  async getTypes() {
    const types = await this.masterDataService.getType();
    const dto = this.masterDataFactory.mapTypeModelsToDtos(types);
    return success<TypeDto[]>(dto, HttpStatus.OK);
  }

  @Get('/role')
  async getRole() {
    const roles = await this.masterDataService.getRole();
    const dto = this.masterDataFactory.mapRoleModelsToRoleDtos(roles);
    return success<RoleDto[]>(dto, HttpStatus.OK);
  }

  @Get('/typecourse')
  async getTypeCourse() {
    const data = await this.masterDataService.getTypeCourse();
    const dto =
      this.masterDataFactory.mapTypeCourseModelsToTypeCourseDtos(data);
    return success<TypeCourseDto[]>(dto, HttpStatus.OK);
  }

  @Get('type/list')
  async getListType(@Query('type') type: string) {
    const types = await this.masterDataService.getListType(type);
    const dto = this.masterDataFactory.mapListTypeModelsToListTypeDtos(types);
    return success<ListTypeDto[]>(dto, HttpStatus.OK);
  }
}
