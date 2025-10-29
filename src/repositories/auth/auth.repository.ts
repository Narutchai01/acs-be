import { Injectable } from '@nestjs/common';
import { IAuthRepository } from './auth.abstract';
import { AuthFactory } from './auth.factory';
import {
  RequestPasswordRequestCredentialsModel,
  ForgetPasswordCredentialsModel,
} from 'src/models/auth';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    private authFactory: AuthFactory,
    private prisma: PrismaService,
  ) {}

  async createForgetPasswordCredential(
    data: RequestPasswordRequestCredentialsModel,
  ): Promise<ForgetPasswordCredentialsModel> {
    const entity = await this.prisma.forgetPasswordCredential.create({
      data,
    });

    return this.authFactory.mapForgetPasswordCredentialsEntityToForgetPasswordCredentialsModel(
      entity,
    );
  }

  async getForgetPasswordCredentialByRefCode(
    refferenceCode: string,
  ): Promise<ForgetPasswordCredentialsModel | null> {
    const entity = await this.prisma.forgetPasswordCredential.findFirst({
      where: { refferenceCode, deletedAt: null, expiredAt: { gt: new Date() } },
    });

    if (!entity) {
      return null;
    }

    return this.authFactory.mapForgetPasswordCredentialsEntityToForgetPasswordCredentialsModel(
      entity,
    );
  }
}
