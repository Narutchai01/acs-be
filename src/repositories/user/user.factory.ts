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
      id: data.id,
      firstNameTh: data.firstNameTh,
      lastNameTh: data.lastNameTh,
      firstNameEn: data.firstNameEn || null,
      lastNameEn: data.lastNameEn || null,
      email: data.email,
      nickName: data.nickName || null,
      imageUrl: data.imageUrl || null,
      password: data.password,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt || null,
      createdBy: data.createdBy || null,
      updatedBy: data.updatedBy || null,
      roles: data.UserRole
        ? data.UserRole.map((userRole) =>
            this.roleFactory.mapUserRoleEntityToUserRoleModel(userRole),
          )
        : undefined,
    };
  }
}
