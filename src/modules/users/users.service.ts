import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/user';
import { IUserRepository } from 'src/repositories/user/user.abstract';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user.dto';
import { IRoleRepository } from 'src/repositories/role/role.abtract';
import { IAdminRepository } from 'src/repositories/admin/admin.abstract';
import { PasswordService } from 'src/core/utils/password/password.service';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: IUserRepository,
    private roleRepository: IRoleRepository,
    private adminRepository: IAdminRepository,
    private passwordService: PasswordService,
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
      password: await this.passwordService.hashPassword(data.password),
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

  async updateUser(
    id: number,
    data: UpdateUserDto,
    editerId: number,
  ): Promise<UserModel> {
    const existData = await this.userRepository.getUserById(id);

    if (existData instanceof Error) {
      throw new Error(`Failed to get user data: ${existData.message}`);
    }

    if (!existData) {
      throw new Error(`userId '${id}' not found`);
    }

    const updateData = {
      firstNameTh: data.firstNameTh || existData.firstNameTh,
      lastNameTh: data.lastNameTh || existData.lastNameTh,
      firstNameEn: data.firstNameEn || existData.firstNameEn,
      lastNameEn: data.lastNameEn || existData.lastNameEn,
      email: data.email || existData.email,
      nickName: data.nickName || existData.nickName,
      imageUrl: data.imageUrl || existData.imageUrl,
      password: data.password
        ? await this.passwordService.hashPassword(data.password)
        : existData.password,
      updatedBy: editerId,
    };

    return this.userRepository.updateUser(id, updateData);
  }
}
