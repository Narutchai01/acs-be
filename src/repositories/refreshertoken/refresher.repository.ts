import { Injectable } from '@nestjs/common';
import { IRefresherTokenRepository } from './refresher.abstract';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import {
  CreateRefresherTokenModel,
  RefresherTokenModel,
} from 'src/models/refresher-token';

@Injectable()
export class RefresherTokenRepository implements IRefresherTokenRepository {
  constructor(private prisma: PrismaService) {}

  async upsert(data: CreateRefresherTokenModel): Promise<RefresherTokenModel> {
    const token = await this.prisma.refreshToken.upsert({
      where: { userId: data.userId },
      update: {
        id: data.id,
        token: data.token,
        expiry: data.expiry,
      },
      create: {
        id: data.id,
        userId: data.userId,
        token: data.token,
        expiry: data.expiry,
      },
    });
    return token;
  }
}
