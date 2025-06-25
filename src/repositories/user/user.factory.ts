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
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
      deletedDate: data.deletedDate || null,
      createdBy: data.createdBy ?? undefined,
      updatedBy: data.updatedBy || null,
      userRole: this.roleFactory.mapUserRoleEntitiesToUserRoleModels(
        data.UserRole || [],
      ),
    };
  }
}
