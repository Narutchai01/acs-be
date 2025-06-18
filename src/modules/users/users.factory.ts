import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/user';

@Injectable()
export class UsersFactory {
  constructor() {}

  mapUserModelToUserDto(data: UserModel): any {
    return {
      id: data.id,
      email: data.email,
      first: data.firstNameTh,
      last: data.lastNameTh,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    };
  }
}
