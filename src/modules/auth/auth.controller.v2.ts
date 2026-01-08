import {
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { success } from 'src/core/interceptors/response.helper';
import { CommonAuthGuard } from './common-auth.guard';
import { UserModel } from 'src/models/user';
import { Response } from 'express';
import { JwtCommonAuthGuard } from './jwt-common.guard';
import { UserRoleModel } from 'src/models/role';
import { UsersFactory } from '../users/users.factory';

interface CommonRequest {
  user: UserModel;
}

interface CommonJwtRequest {
  user: {
    userId: number;
    roles: UserRoleModel[];
  };
}

@Controller({
  path: 'auth',
  version: '2',
})
export class AuthControllerV2 {
  constructor(
    private readonly authService: AuthService,
    private readonly userFactory: UsersFactory,
  ) {}

  @UseGuards(CommonAuthGuard)
  @Post('login')
  async login(
    @Request() req: CommonRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user } = req;
    const result = await this.authService.loginV2(user);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    const dto = this.userFactory.mapUserModelToUserDto(user);
    return success(dto, HttpStatus.OK);
  }

  @UseGuards(JwtCommonAuthGuard)
  @Get('me')
  async getProfile(@Request() req: CommonJwtRequest) {
    const { userId } = req.user;
    const user = await this.authService.getUserData(userId);
    return success(user, HttpStatus.OK);
  }

  @UseGuards(JwtCommonAuthGuard)
  @Post('logout')
  logout(
    @Request() req: CommonJwtRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');

    return success(null, HttpStatus.OK);
  }
}
