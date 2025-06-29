import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/user';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersFactory {
  constructor() {}

  mapUserModelToUserDto(data: UserModel): UserDto {
    return {
      id: data.id,
      email: data.email,
      firstName: data.firstNameTh,
      lastName: data.lastNameTh,
      // createdAt: data.createdAt,
    };
  }
}
