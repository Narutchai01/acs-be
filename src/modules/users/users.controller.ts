import { Body, Controller, Post, Query, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  createUser(
    @Body() createUserDto: CreateUserDto,
    @Query('role') role: string,
  ) {
    try {
      const newUser = {
        firstNameTh: createUserDto.firstNameTh,
        lastNameTh: createUserDto.lastNameTh,
        firstNameEn: createUserDto.firstNameEn ?? null,
        lastNameEn: createUserDto.lastNameEn ?? null,
        email: createUserDto.email,
        nickName: createUserDto.nickName ?? null,
        password: createUserDto.password,
      };
      return this.usersService.createUserV2(newUser, null, role);
    } catch (error) {
      return {
        statusCode: 500,
        message: `Failed to create user: ${error instanceof Error ? error.message : error}`,
      };
    }
  }
}
