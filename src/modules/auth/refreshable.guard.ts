// TODO: Implement refresh token logic

import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { Request } from 'express';

interface TokenCookies {
  access: string | null;
  refresh: string | null;
}

const readTokenFromCookie = (req: Request): TokenCookies => {
  const access: string | null = req.cookies?.access_token ?? null;
  const refresh: string | null = req.cookies?.refresh_token ?? null;
  return { access, refresh };
};

@Injectable()
export class RefresherAuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { refresh } = readTokenFromCookie(request);
    if (!refresh) {
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  }
}
