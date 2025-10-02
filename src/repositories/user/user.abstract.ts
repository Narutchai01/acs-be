import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserModel, UpdateUserModel } from 'src/models/user';

@Injectable()
export abstract class IUserRepository {
  abstract createUser(data: Prisma.UserCreateInput): Promise<UserModel>;
  abstract getUserEmail(email: string): Promise<UserModel>;
  abstract getUserById(id: number): Promise<UserModel>;
  abstract update(id: number, data: UpdateUserModel): Promise<UserModel>;
}
