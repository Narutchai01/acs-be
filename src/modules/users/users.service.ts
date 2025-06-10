import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/user';
import { IUserRepository } from 'src/repositories/user/user.abstract';
import { CreateUserDto } from './dto/create-user';
import { IRoleRepository } from 'src/repositories/role/role.abtract';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: IUserRepository,
    private roleRepository: IRoleRepository,
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
    const user = await this.userRepository.createUser(data);

    const UserRoles = await this.roleRepository.createUserRole({
      userId: user.id,
      roleId: roleResult.id,
    });

    if (UserRoles instanceof Error) {
      throw new Error(`Failed to assign role to user: ${UserRoles.message}`);
    }

    return user;
  }
}
