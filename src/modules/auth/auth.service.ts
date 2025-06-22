import { Injectable } from '@nestjs/common';
import { comparePassword } from 'src/core/utils/passwordManagement';
import { IRoleRepository } from 'src/repositories/role/role.abtract';
import { IUserRepository } from 'src/repositories/user/user.abstract';
import { UserModel } from 'src/models/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: IUserRepository,
    private RoleRepository: IRoleRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
    role: string,
  ): Promise<{ user: UserModel; userId: number; roleId: number } | null> {
    const user = await this.userRepository.getUserEmail(email);
    if (user instanceof Error) {
      return null;
    }

    const isValidRole = await this.RoleRepository.validateUserRole(
      user.id,
      role,
    );
    if (!isValidRole) {
      return null;
    }

    const roleResult = await this.RoleRepository.getByName(role);
    if (roleResult instanceof Error) {
      return null;
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return {
      user,
      userId: user.id,
      roleId: roleResult.id,
    };
  }

  login(user: { userId: number; roleId: number }): { accessToken: string } {
    const { userId, roleId } = user;
    const payload = { userId, roleId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
