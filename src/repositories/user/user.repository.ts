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

  async getUserEmail(email: string): Promise<UserModel | Error> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      return new Error(`User with email ${email} not found`);
    }
    return this.userFactory.mapUserEntityToUserModel(user);
  }

  async getUserById(id: number): Promise<UserModel | Error> {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      return new Error(`User with id ${id} not found`);
    }
    return this.userFactory.mapUserEntityToUserModel(user);
  }
}
