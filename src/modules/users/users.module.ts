import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { PasswordModule } from 'src/core/utils/password/password.module';
import { SupabaseModule } from 'src/provider/store/supabase/supabase.module';
import { UsersFactory } from './users.factory';

@Module({
  imports: [RepositoriesModule, PasswordModule, SupabaseModule],
  controllers: [UsersController],
  providers: [UsersService, UsersFactory],
  exports: [UsersFactory, UsersService],
})
export class UsersModule {}
