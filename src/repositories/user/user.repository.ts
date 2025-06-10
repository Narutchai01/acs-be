import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/repositories/user/user.abstract';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { UserFactory } from 'src/repositories/user/user.factory';
import { UserModel } from 'src/models/user';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private prisma: PrismaService,
    private userFactory: UserFactory,
  ) {}

  async createUser(data: Prisma.UserCreateInput): Promise<UserModel> {
    const newUser = await this.prisma.user.create({
      data,
    });
    return this.userFactory.mapUserEntityToUserModel(newUser);
  }
}
