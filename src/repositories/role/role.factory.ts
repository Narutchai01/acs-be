import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { RoleEntity, UserRoleEntity } from 'src/entities/role.entity';
import { RoleModel, UserRoleModel } from 'src/models/role';
import { UserFactory } from '../user/user.factory';

@Injectable()
export class RoleFactory {
  constructor(
    @Inject(forwardRef(() => UserFactory))
    private userFactory: UserFactory,
  ) {}

  mapRoleEntitiesToRoleModels(data: RoleEntity[]): RoleModel[] {
    return data.map((role) => this.mapRoleEntityToRoleModel(role));
  }

  mapRoleEntityToRoleModel(data: RoleEntity): RoleModel {
    return {
      id: data.id,
      name: data.name,
    };
  }

  mapUserRoleEntityToUserRoleModel(data: UserRoleEntity): UserRoleModel {
    return {
      id: data.id,
      user: this.userFactory.mapUserEntityToUserModel(data.user),
      role: this.mapRoleEntityToRoleModel(data.role),
      userId: data.userId,
      roleId: data.roleId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
