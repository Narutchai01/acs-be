import { Injectable } from '@nestjs/common';
import { IMajorPositionRepository } from 'src/repositories/majorposition/majorposition.abstract';
import { MajorPositionModel } from 'src/models/majorposition';
import { TypeModel } from 'src/models/type';
import { ITypeRepository } from 'src/repositories/type/type.abstact';
import { IRoleRepository } from 'src/repositories/role/role.abtract';
import { ITypeCourseRepository } from 'src/repositories/typecourse/typecourse.abstract';
import { RoleModel } from 'src/models/role';
import { TypeCourseModel } from 'src/models/course';
import { ListTypeModel } from 'src/models/type';
import { IEducationLevelRepository } from 'src/repositories/educationlevel/educationlvel.abstract';
import { EducationLevelModel } from 'src/models/educationlavel';
import { IAcademicPositionRepository } from 'src/repositories/academicposition/academicposition.abstract';
import { AcademicPositionModel } from 'src/models/academicposition';
@Injectable()
export class MasterdataService {
  constructor(
    private majorPositionRepository: IMajorPositionRepository,
    private typeRepository: ITypeRepository,
    private roleRepository: IRoleRepository,
    private typeCourseRepository: ITypeCourseRepository,
    private educationLevelRepository: IEducationLevelRepository,
    private academicPositionRepository: IAcademicPositionRepository,
  ) {}

  async getMajorPosition(): Promise<MajorPositionModel[]> {
    return await this.majorPositionRepository.get();
  }

  async getType(): Promise<TypeModel[]> {
    return await this.typeRepository.getTypes();
  }

  async getRole(): Promise<RoleModel[]> {
    return await this.roleRepository.getList();
  }

  async getTypeCourse(): Promise<TypeCourseModel[]> {
    return this.typeCourseRepository.getTypeCourse();
  }

  async getListType(type: string): Promise<ListTypeModel[]> {
    return await this.typeRepository.getListTypes(type);
  }

  async getEducationLevels(): Promise<EducationLevelModel[]> {
    return await this.educationLevelRepository.getEducationLevels();
  }

  async getAcademicPosition(): Promise<AcademicPositionModel[]> {
    return this.academicPositionRepository.getAcademicPosition();
  }
}
