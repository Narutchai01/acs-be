import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
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

  async getUserEmail(email: string): Promise<UserModel> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new HttpException(
        `User with email ${email} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.userFactory.mapUserEntityToUserModel(user);
  }

  async getUserById(id: number): Promise<UserModel> {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.userFactory.mapUserEntityToUserModel(user);
  }
}
