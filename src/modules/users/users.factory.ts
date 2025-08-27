import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserModel } from 'src/models/user';

@Injectable()
export class UsersFactory {
  constructor() {}

  mapUserModelsToUserDtos(data: UserModel[]): UserDto[] {
    return data.map((item) => this.mapUserModelToUserDto(item));
  }

  mapUserModelToUserDto(data: UserModel): UserDto {
    return {
      id: data.id,
      email: data.email,
      firstNameTh: data.firstNameTh,
      lastNameTh: data.lastNameTh,
      firstNameEn: data.firstNameEn || '',
      lastNameEn: data.lastNameEn || '',
      nickName: data.nickName || '',
      imageUrl: data.imageUrl || '',
    };
  }
}
