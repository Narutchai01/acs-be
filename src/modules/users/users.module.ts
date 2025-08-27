import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { PasswordModule } from 'src/core/utils/password/password.module';
import { UsersFactory } from './users.factory';

@Module({
  imports: [RepositoriesModule, PasswordModule],
  controllers: [UsersController],
  providers: [UsersService, UsersFactory],
  exports: [UsersFactory],
})
export class UsersModule {}
