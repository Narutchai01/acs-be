import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
// import type { UserRoleModel } from 'src/models/role';
// import { UserModel } from 'src/models/user';
import { UserRoleModel } from 'src/models/role';

interface JwtCommonRequest extends Request {
  cookies: {
    accessToken?: string;
  };
}

// interface CommonRequest {
//   user: UserModel;
// }

@Injectable()
export class JwtCommonStrategy extends PassportStrategy(
  Strategy,
  'jwt-common',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: JwtCommonRequest) => {
          return req?.cookies?.accessToken || null;
        },
      ]),
      secretOrKey: String(configService.get('JWT_SECRET')),
      ignoreExpiration: false,
    });
  }

  validate(payload: { userId: number; roles: UserRoleModel[] }) {
    console.log('JWT payload', payload);

    const { userId, roles } = payload;
    return { userId, roles };
  }
}
