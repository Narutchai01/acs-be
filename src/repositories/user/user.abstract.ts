import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserModel } from 'src/models/user';

@Injectable()
export abstract class IUserRepository {
  abstract createUser(data: Prisma.UserCreateInput): Promise<UserModel>;
}
