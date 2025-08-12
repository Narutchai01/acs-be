import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/repositories/user/user.abstract';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { UserFactory } from 'src/repositories/user/user.factory';
import { UpdateUserModel, UserModel } from 'src/models/user';

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

  async updateUser(id: number, data: UpdateUserModel) {
    try {
      const existData = await this.prisma.user.findUnique({ where: { id } });

      if (!existData) {
        return new Error(`User with id ${id} not found`);
      }

      const updateData = {
        ...data,
        updatedBy: data.updatedBy === null ? undefined : data.updatedBy,
      };

      const userEntity = await this.prisma.user.update({
        where: { id: id },
        data: updateData,
      });

      return this.userFactory.mapUserEntityToUserModel(userEntity);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Update user failed:', error.message);
        throw new Error(`Unable to update user: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        throw new Error('Unable to update user: Unknown error occurred');
      }
    }
  }
}
