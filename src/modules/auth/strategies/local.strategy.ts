import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(
  Strategy,
  'admin-local',
) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<{ user: any; userId: number; roleId: number }> {
    const result = await this.authService.validateUser(
      email,
      password,
      'admin',
    );
    if (!result) {
      throw new UnauthorizedException();
    }
    return result;
  }
}
