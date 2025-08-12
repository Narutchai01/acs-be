import {
  Body,
  Controller,
  Patch,
  Post,
  Query,
  UseInterceptors,
  Request,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticatedRequest } from 'src/models/auth';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
      return this.usersService.createUser(createUserDto, role);
    } catch (error) {
      return {
        statusCode: 500,
        message: `Failed to create user: ${error instanceof Error ? error.message : error}`,
      };
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const IdNumber = Number(id);
    const result = await this.usersService.updateUser(
      IdNumber,
      body,
      req.user.userId,
    );

    return result;
  }
}
