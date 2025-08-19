import { Injectable } from '@nestjs/common';
import { IMajorPositionRepository } from 'src/repositories/majorposition/majorposition.abstract';
import { MajorPositionModel } from 'src/models/majorposition';
import { TypeModel } from 'src/models/type';
import { ITypeRepository } from 'src/repositories/type/type.abstact';
import { IRoleRepository } from 'src/repositories/role/role.abtract';
import { RoleModel } from 'src/models/role';
import { ITypeCourseRepository } from 'src/repositories/typecourse/typecourse.abstract';
import { TypeCourseModel } from 'src/models/course';
@Injectable()
export class MasterdataService {
  constructor(
    private majorPositionRepository: IMajorPositionRepository,
    private typeRepository: ITypeRepository,
    private roleRepository: IRoleRepository,
    private typeCourseRepository: ITypeCourseRepository,
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
}
