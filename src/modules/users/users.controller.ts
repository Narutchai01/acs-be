import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user';
import { success } from 'src/core/interceptors/response.helper';
import { UsersFactory } from './users.factory';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private userFactory: UsersFactory,
  ) {}
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Query('role') role: string,
  ) {
    const newUser = {
      firstNameTh: createUserDto.firstNameTh,
      lastNameTh: createUserDto.lastNameTh,
      firstNameEn: createUserDto.firstNameEn ?? null,
      lastNameEn: createUserDto.lastNameEn ?? null,
      email: createUserDto.email,
      nickName: createUserDto.nickName ?? null,
      password: createUserDto.password,
    };
    const user = await this.usersService.createUser(newUser, role);
    const dto = this.userFactory.mapUserModelToUserDto(user);
    return success(dto, HttpStatus.CREATED);
  }
}
