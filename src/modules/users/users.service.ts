import { Injectable } from '@nestjs/common';
import { UpdateUserModel, UserModel } from 'src/models/user';
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
  async createUser(data: CreateUserDto, role: string): Promise<UserModel> {
    const hashPassword = await this.passwordService.hashPassword(data.password);
    const newUser = {
      firstNameTh: data.firstNameTh,
      lastNameTh: data.lastNameTh,
      firstNameEn: data.firstNameEn ?? null,
      lastNameEn: data.lastNameEn ?? null,
      email: data.email,
      nickName: data.nickName ?? null,
      password: hashPassword,
    };
    const user = await this.userRepository.createUser(newUser);

    const existingRole = await this.roleRepository.getByName(role);
    if (existingRole instanceof Error) {
      throw existingRole;
    }
    await this.roleRepository.createUserRole({
      userId: user.id,
      roleId: existingRole.id,
      createdBy: user.id,
      updatedBy: user.id,
    });
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

  async getUserByEmail(email: string): Promise<UserModel> {
    return this.userRepository.getUserEmail(email);
  }

  async getUserById(id: number): Promise<UserModel> {
    return this.userRepository.getUserById(id);
  }

  async updateUser(id: number, data: UpdateUserModel): Promise<UserModel> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    const updateData: UpdateUserModel = {
      firstNameTh: data.firstNameTh ? data.firstNameTh : user.firstNameTh,
      lastNameTh: data.lastNameTh ? data.lastNameTh : user.lastNameTh,
      firstNameEn: data.firstNameEn ? data.firstNameEn : user.firstNameEn,
      lastNameEn: data.lastNameEn ? data.lastNameEn : user.lastNameEn,
      email: data.email ? data.email : user.email,
      imageUrl: user.imageUrl ?? null,
      nickName: data.nickName ? data.nickName : user.nickName,
    };
    return this.userRepository.update(id, updateData);
  }

  async createSuperUser(data: CreateUserDto): Promise<UserModel> {
    const hashPassword = await this.passwordService.hashPassword(data.password);
    const newUser = {
      firstNameTh: data.firstNameTh,
      lastNameTh: data.lastNameTh,
      firstNameEn: data.firstNameEn ?? null,
      lastNameEn: data.lastNameEn ?? null,
      email: data.email,
      nickName: data.nickName ?? null,
      password: hashPassword,
    };
    const user = await this.userRepository.createUser(newUser);
    return user;
  }

  async updatePassword(id: number, password: string): Promise<UserModel> {
    const hashPassword = await this.passwordService.hashPassword(password);
    return this.userRepository.updatePassword(id, hashPassword);
  }
}
