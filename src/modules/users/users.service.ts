import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/user';
import { IUserRepository } from 'src/repositories/user/user.abstract';
import { CreateUserDto } from './dto/create-user';
import { IRoleRepository } from 'src/repositories/role/role.abtract';
import { IAdminRepository } from 'src/repositories/admin/admin.abstract';
import { hashPassword } from 'src/core/utils/passwordManagement';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: IUserRepository,
    private roleRepository: IRoleRepository,
    private adminRepository: IAdminRepository,
  ) {}
  async createUser(
    data: CreateUserDto,
    role: string,
  ): Promise<UserModel | Error> {
    const roleResult = await this.roleRepository.getByName(role);
    if (roleResult instanceof Error) {
      throw new Error(`Failed to get role: ${roleResult.message}`);
    }

    if (!roleResult) {
      throw new Error(`Role '${role}' not found`);
    }
    const newData = {
      ...data,
      password: await hashPassword(data.password),
    };
    const user = await this.userRepository.createUser(newData);

    const UserRoles = await this.roleRepository.createUserRole({
      userId: user.id,
      roleId: roleResult.id,
    });

    if (UserRoles instanceof Error) {
      throw new Error(`Failed to assign role to user: ${UserRoles.message}`);
    }
    if (role === 'admin') {
      const admin = await this.adminRepository.create(user.id);

      if (admin instanceof Error) {
        throw new Error(`Failed to create admin: ${admin.message}`);
      }
    }

    if (UserRoles instanceof Error) {
      throw new Error(`Failed to assign role to user: ${UserRoles.message}`);
    }

    return user;
  }
}
