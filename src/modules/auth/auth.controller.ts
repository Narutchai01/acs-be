import {
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from 'src/models/auth';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersFactory } from '../users/users.factory';
import { success } from 'src/core/interceptors/response.helper';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userFactory: UsersFactory,
  ) {}

  @UseGuards(AuthGuard('admin-local'))
  @Post('login-admin')
  login(@Request() req: AuthenticatedRequest) {
    const { userId, roleId } = req.user;
    const { accessToken } = this.authService.login({ userId, roleId });
    return {
      msg: accessToken,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: AuthenticatedRequest) {
    const user = await this.authService.getUserData(req.user.userId);
    const dto = this.userFactory.mapUserModelToUserDto(user);
    return success(dto, HttpStatus.OK);
  }
}
