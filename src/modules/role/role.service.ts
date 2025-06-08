import { Injectable } from '@nestjs/common';
import { IRoleRepository } from 'src/repositories/role/role.abstract';

@Injectable()
export class RoleService {
  constructor(private roleRepository: IRoleRepository) {}

  async getRoles() {
    return this.roleRepository.getRoles();
  }
}
