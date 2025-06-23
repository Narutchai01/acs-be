import { Injectable } from '@nestjs/common';
import { AdminModel } from 'src/models/admin';
import { UserModel } from 'src/models/user';
import { IAdminRepository } from 'src/repositories/admin/admin.abstract';
import { IRoleRepository } from 'src/repositories/role/role.abtract';
import { IUserRepository } from 'src/repositories/user/user.abstract';

@Injectable()
export class AdminService {
  constructor(
    private adminRepository: IAdminRepository,
    private userRoleRepository: IRoleRepository,
    private userRepository: IUserRepository,
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

  async getAdminById(id: number): Promise<UserModel | Error> {
    const admin = await this.userRepository.getUserById(id);
    if (admin instanceof Error) {
      return new Error(`Failed to get admin: ${admin.message}`);
    }
    return admin;
  }
}
