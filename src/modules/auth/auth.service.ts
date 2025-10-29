import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { IRoleRepository } from 'src/repositories/role/role.abtract';
import { IUserRepository } from 'src/repositories/user/user.abstract';
import { UserModel } from 'src/models/user';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/core/utils/password/password.service';
import { UsersService } from '../users/users.service';
import { LoginRequest } from 'src/models/auth';
import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'node:crypto';
import { IRefresherTokenRepository } from 'src/repositories/refreshertoken/refresher.abstract';
import { IAuthRepository } from 'src/repositories/auth/auth.abstract';
import { ForgetPasswordCredentialsModel } from 'src/models/auth';
import { MailService } from '../mail/mail.service';
import { appDominain } from 'src/config/config';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: IUserRepository,
    private RoleRepository: IRoleRepository,
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private usersService: UsersService,
    private refresherTokenRepository: IRefresherTokenRepository,
    private authRepository: IAuthRepository,
    private emailService: MailService,
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

    if (!user.password) {
      throw new HttpException('Password not set', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      user.password,
    );
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

  async getUserData(userId: number): Promise<UserModel> {
    const user = await this.userRepository.getUserById(userId);
    if (user instanceof Error) {
      throw new HttpException(
        `user ID ${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async validateUserV2(data: LoginRequest): Promise<UserModel> {
    const { email, password } = data;
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    if (!user.password) {
      throw new HttpException('Password not set', HttpStatus.UNAUTHORIZED);
    }
    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async signRefreshToken(userId: number): Promise<string> {
    const uuid = uuidv4();
    const secret = randomBytes(64).toString('base64url');
    const token = `${uuid}.${secret}`;
    const hashToken = await this.passwordService.hashPassword(token);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // 7 days

    const refresher = await this.refresherTokenRepository.upsert({
      id: uuid,
      userId: userId,
      token: hashToken,
      expiry: expiryDate,
    });

    if (!refresher) {
      throw new HttpException(
        'Could not create refresh token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.jwtService.sign(
      { tokenId: uuid, tokenSecret: secret },
      { expiresIn: '7d' },
    );
  }

  signAccessToken(user: UserModel): string {
    const payload = { userId: user.id, roles: user.userRole };
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  async loginV2(
    user: UserModel,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    console.log(Date.now(), 'AuthService loginV2', user);

    return {
      refreshToken: await this.signRefreshToken(user.id),
      accessToken: this.signAccessToken(user),
    };
  }

  async createForgetPasswordCredential(data: {
    email: string;
  }): Promise<ForgetPasswordCredentialsModel> {
    const user = await this.usersService.getUserByEmail(data.email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const credential = await this.authRepository.createForgetPasswordCredential(
      {
        userId: user.id,
        refferenceCode: uuidv4(),
        createdBy: user.id,
        updatedBy: user.id,
      },
    );

    if (!appDominain) {
      throw new HttpException(
        'APP_DOMAIN is not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Send forget password email
    await this.emailService.sendForgetPasswordCredential(
      user.email,
      credential.refferenceCode,
      appDominain,
    );

    return credential;
  }

  async getForgetPasswordCredentialByRefCode(
    refferenceCode: string,
  ): Promise<ForgetPasswordCredentialsModel | null> {
    return this.authRepository.getForgetPasswordCredentialByRefCode(
      refferenceCode,
    );
  }

  async resetPassword(data: {
    refferenceCode: string;
    newPassword: string;
  }): Promise<void> {
    const credential = await this.getForgetPasswordCredentialByRefCode(
      data.refferenceCode,
    );
    if (!credential) {
      throw new HttpException(
        'Invalid or expired reference code',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.usersService.getUserById(credential.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.usersService.updatePassword(user.id, data.newPassword);
  }
}
