import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/user';
import { IUserRepository } from 'src/repositories/user/user.abstract';
import { CreateUserDto } from './dto/create-user';
import { IRoleRepository } from 'src/repositories/role/role.abtract';
import { PasswordService } from 'src/core/utils/password/password.service';
import { CreateUserModel } from 'src/models/user';
import { SupabaseService } from 'src/provider/store/supabase/supabase.service';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: IUserRepository,
    private roleRepository: IRoleRepository,
    private passwordService: PasswordService,
    private supabaseService: SupabaseService,
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

    if (UserRoles instanceof Error) {
      throw new Error(`Failed to assign role to user: ${UserRoles.message}`);
    }

    return user;
  }

  async createUserV2(
    data: CreateUserModel,
    file?: Express.Multer.File,
    role: string = 'user',
    isPassword: boolean = false,
  ): Promise<{ user: UserModel; password?: string }> {
    let imageUrl: string | undefined;
    let hashPassword: string | undefined;
    let password: string | undefined;
    if (isPassword) {
      password = await this.passwordService.generateRandomPassword(8);
      hashPassword = await this.passwordService.hashPassword(password);
    }
    if (file) {
      imageUrl = await this.supabaseService.uploadFile(file, role);
    }

    const newData = {
      ...data,
      password: isPassword ? hashPassword : null,
      ...(imageUrl ? { imageUrl } : null),
    };
    const user = await this.userRepository.createUser(newData);
    return { user, password };
  }
}
