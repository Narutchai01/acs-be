import { Injectable } from '@nestjs/common';
import { IMajorPositionRepository } from 'src/repositories/majorposition/majorposition.abstract';
import { MajorPositionModel } from 'src/models/majorposition';
import { IRoleRepository } from 'src/repositories/role/role.abtract';
import { RoleModel } from 'src/models/role';

@Injectable()
export class MasterdataService {
  constructor(
    private majorPositionRepository: IMajorPositionRepository,
    private roleRepository: IRoleRepository,
  ) {}

  async getMajorPosition(): Promise<MajorPositionModel[]> {
    return await this.majorPositionRepository.get();
  }

  async getRole(): Promise<RoleModel[] | Error> {
    return await this.roleRepository.getList();
  }
}
