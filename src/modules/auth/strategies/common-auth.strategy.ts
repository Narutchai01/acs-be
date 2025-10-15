import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserModel } from 'src/models/user';

@Injectable()
export class CommonAuthStrategy extends PassportStrategy(
  Strategy,
  'common-auth',
) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<UserModel> {
    const result = await this.authService.validateUserV2({ email, password });
    console.log('CommonAuthStrategy validate', result);

    if (!result) {
      throw new HttpException('Unauthorized 1', 401);
    }
    return result;
  }
}
