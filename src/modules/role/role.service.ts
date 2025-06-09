import { Injectable } from '@nestjs/common';
import { RoleModel } from 'src/models/role';
import { IRoleRepository } from 'src/repositories/role/role.abtract';

@Injectable()
export class RoleService {
  constructor(private roleRepository: IRoleRepository) {}
  async getList(): Promise<RoleModel[] | Error> {
    return this.roleRepository.getList();
  }
}
