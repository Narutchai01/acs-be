import { Injectable } from '@nestjs/common';
import { AdminEntity } from 'src/entities/admin.entity';
import { AdminModel } from 'src/models/admin';
import { RoleFactory } from '../role/role.factory';

@Injectable()
export class AdminFactory {
  constructor(private roleFactory: RoleFactory) {}

  mapAdminEntitiesToAdminModels(data: AdminEntity[]): AdminModel[] {
    return data.map((item) => this.mapAdminEntityToAdminModel(item));
  }
  mapAdminEntityToAdminModel(data: AdminEntity): AdminModel {
    return {
      id: data.id,
      userRoleId: data.userRoleId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      userRole: this.roleFactory.mapUserRoleEntityToUserRoleModel(
        data.userRole,
      ),
    };
  }
}
