import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserModel, UpdateUserModel } from 'src/models/user';

@Injectable()
export abstract class IUserRepository {
  abstract createUser(data: Prisma.UserCreateInput): Promise<UserModel>;
  abstract getUserEmail(email: string): Promise<UserModel | Error>;
  abstract getUserById(id: number): Promise<UserModel | Error>;
  abstract updateUser(id: number, data: UpdateUserModel);
}
