import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { UserModel } from 'src/models/user';
import { RoleFactory } from '../role/role.factory';

@Injectable()
export class UserFactory {
  constructor(
    @Inject(forwardRef(() => RoleFactory))
    private roleFactory: RoleFactory,
  ) {}

  mapUserEntitiesToUserModels(data: UserEntity[]): UserModel[] {
    return data.map((user) => this.mapUserEntityToUserModel(user));
  }

  mapUserEntityToUserModel(data: UserEntity): UserModel {
    return {
      ...data,
      createdBy: data.createdBy ?? undefined,
      updatedBy: data.updatedBy ?? undefined,
      deletedAt: data.deletedAt ?? undefined,
      userRole: this.roleFactory.mapUserRoleEntitiesToUserRoleModels(
        data.UserRole || [],
      ),
    };
  }
}
