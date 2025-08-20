import { Injectable } from '@nestjs/common';
import { IMajorPositionRepository } from 'src/repositories/majorposition/majorposition.abstract';
import { MajorPositionModel } from 'src/models/majorposition';
import { IRoleRepository } from 'src/repositories/role/role.abtract';
import { ITypeCourseRepository } from 'src/repositories/typecourse/typecourse.abstract';
import { RoleModel } from 'src/models/role';
import { TypeCourseModel } from 'src/models/course';
import { ITypeRepositoty } from 'src/repositories/type/type.abstact';
import { ListTypeModel } from 'src/models/type';

@Injectable()
export class MasterdataService {
  constructor(
    private majorPositionRepository: IMajorPositionRepository,
    private roleRepository: IRoleRepository,
    private typeCourseRepository: ITypeCourseRepository,
    private typeRepository: ITypeRepositoty,
  ) {}

  async getMajorPosition(): Promise<MajorPositionModel[]> {
    return await this.majorPositionRepository.get();
  }

  async getRole(): Promise<RoleModel[]> {
    return await this.roleRepository.getList();
  }

  async getTypeCourse(): Promise<TypeCourseModel[]> {
    return this.typeCourseRepository.getTypeCourse();
  }

  async getListType(type: string): Promise<ListTypeModel[]> {
    return this.typeRepository.getListTypes(type);
  }
}
