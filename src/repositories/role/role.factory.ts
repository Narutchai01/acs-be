import { Injectable } from '@nestjs/common';
import { RoleEntity } from 'src/entities/role.entity';
import { RoleModel } from 'src/models/role';

@Injectable()
export class RoleFactory {
  constructor() {}

  mapRoleEntitiesToRoleModels(data: RoleEntity[]): RoleModel[] {
    return data.map((role) => this.mapRoleEntityToRoleModel(role));
  }

  mapRoleEntityToRoleModel(data: RoleEntity): RoleModel {
    return {
      id: data.id,
      name: data.name,
    };
  }
}
