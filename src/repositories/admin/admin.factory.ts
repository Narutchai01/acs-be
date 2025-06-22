import { Injectable } from '@nestjs/common';
import { AdminEntity } from 'src/entities/admin.entity';
import { AdminModel } from 'src/models/admin';
import { RoleFactory } from '../role/role.factory';
import { UserFactory } from '../user/user.factory';

@Injectable()
export class AdminFactory {
  constructor(
    private roleFactory: RoleFactory,
    private userFactory: UserFactory,
  ) {}

  mapAdminEntitiesToAdminModels(data: AdminEntity[]): AdminModel[] {
    return data.map((item) => this.mapAdminEntityToAdminModel(item));
  }
  mapAdminEntityToAdminModel(data: AdminEntity): AdminModel {
    return {
      id: data.id,
      userId: data.userId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      user: this.userFactory.mapUserEntityToUserModel(data.user),
    };
  }
}
