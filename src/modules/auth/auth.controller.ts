import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from 'src/models/auth'; // Adjust the import path as necessary

// ** eslint-disable-next-line @typescript-eslint/no-unused-vars **

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('admin-local'))
  @Post('login-admin')
  login(@Request() req: AuthenticatedRequest) {
    const { userId, roleId } = req.user;
    const { accessToken } = this.authService.login({ userId, roleId });
    return {
      msg: accessToken,
    };
  }
}
