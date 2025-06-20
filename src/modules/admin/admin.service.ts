import { Injectable } from '@nestjs/common';
import { AdminModel } from 'src/models/admin';
import { IAdminRepository } from 'src/repositories/admin/admin.abstract';
import { IRoleRepository } from 'src/repositories/role/role.abtract';

@Injectable()
export class AdminService {
  constructor(
    private adminRepository: IAdminRepository,
    private userRoleRepository: IRoleRepository,
  ) {}

  async createAdmin(userId: number): Promise<AdminModel | Error> {
    try {
      const role = await this.userRoleRepository.getByName('admin');
      if (role instanceof Error) {
        throw new Error(`Failed to get role: ${role.message}`);
      }

      const userRole = await this.userRoleRepository.createUserRole({
        userId,
        roleId: role.id,
      });

      if (userRole instanceof Error) {
        throw new Error(`Failed to create user role: ${userRole.message}`);
      }

      const admin = await this.adminRepository.create(userRole.id);

      return admin;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(`Failed to create admin: ${error.message}`);
      } else {
        return new Error('An unexpected error occurred while creating admin');
      }
    }
  }
}
