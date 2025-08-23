import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { MasterdataService } from './masterdata.service';
import { MasterDataFactoryV1 } from './masterdata.factory.v1';
import { MajorPositionDto } from './dto/majorposition.v1.dto';
import { success } from 'src/core/interceptors/response.helper';
import { TypeDto } from './dto/type.v1.dto';
import { ListTypeDto } from './dto/typelist.v1.dto';
import { RoleDto } from './dto/role.v1.dto';
import { EducationLevelDto } from './dto/educationlevel.v1.dto';
import { TypeCourseDto } from './dto/typecourse.v1.dto';
import { AcademicPositionDto } from './dto/academicposition.v1.dto';

@Controller({
  path: 'master-data',
  version: '1',
})
export class MasterdataControllerV1 {
  constructor(
    private readonly masterDataService: MasterdataService,
    private readonly masterDataFactory: MasterDataFactoryV1,
  ) {}

  @Get()
  async getMasterData(@Query('type') type: string) {
    const [
      majorPositions,
      types,
      roles,
      typeCourses,
      listTypes,
      educationLevels,
      academicPositions,
    ] = await Promise.all([
      this.masterDataService.getMajorPosition(),
      this.masterDataService.getType(),
      this.masterDataService.getRole(),
      this.masterDataService.getTypeCourse(),
      this.masterDataService.getListType(type),
      this.masterDataService.getEducationLevels(),
      this.masterDataService.getAcademicPosition(),
    ]);

    const dtos = {
      majorPositions:
        this.masterDataFactory.mapMajorPositionModelsToDtos(majorPositions),
      types: this.masterDataFactory.mapTypeModelsToDtos(types),
      roles: this.masterDataFactory.mapRoleModelsToDtos(roles),
      typeCourses:
        this.masterDataFactory.mapTypeCourseModelsToTypeCourseDtos(typeCourses),
      listTypes:
        this.masterDataFactory.mapListTypeModelsToListTypeDtos(listTypes),
      educationLevels:
        this.masterDataFactory.mapEducationModelsToDtos(educationLevels),
      academicPositions:
        this.masterDataFactory.mapAcademicPositionModelsToDtos(
          academicPositions,
        ),
    };

    return success(dtos, HttpStatus.OK);
  }

  @Get('/major-positions')
  async getMajorPosition() {
    const majorPositions = await this.masterDataService.getMajorPosition();
    const dto =
      this.masterDataFactory.mapMajorPositionModelsToDtos(majorPositions);
    return success<MajorPositionDto[]>(dto, HttpStatus.OK);
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

  @Get('/roles')
  async getRole() {
    const roles = await this.masterDataService.getRole();
    const dto = this.masterDataFactory.mapRoleModelsToDtos(roles);
    return success<RoleDto[]>(dto, HttpStatus.OK);
  }

  @Get('/education-level')
  async getEducationLevels() {
    const dataEducationLevels =
      await this.masterDataService.getEducationLevels();
    const dto =
      this.masterDataFactory.mapEducationModelsToDtos(dataEducationLevels);
    return success<EducationLevelDto[]>(dto, HttpStatus.OK);
  }

  @Get('/type')
  async getTypes() {
    const types = await this.masterDataService.getType();
    const dto = this.masterDataFactory.mapTypeModelsToDtos(types);
    return success<TypeDto[]>(dto, HttpStatus.OK);
  }

  @Get('/academic-positions')
  async getAcademicPosition() {
    const academicPositions =
      await this.masterDataService.getAcademicPosition();
    const dto =
      this.masterDataFactory.mapAcademicPositionModelsToDtos(academicPositions);
    return success<AcademicPositionDto[]>(dto, HttpStatus.OK);
  }
}
