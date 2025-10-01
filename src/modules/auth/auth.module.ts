import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminLocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { PasswordModule } from 'src/core/utils/password/password.module';
import { UsersModule } from '../users/users.module';
import { AuthControllerV2 } from './auth.controller.v2';
import { CommonAuthStrategy } from './strategies/common-auth.strategy';
import { JwtCommonStrategy } from './strategies/jwt-common.strategy';

@Module({
  imports: [
    RepositoriesModule,
    PassportModule,
    ConfigModule,
    PasswordModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  controllers: [AuthController, AuthControllerV2],
  providers: [
    AuthService,
    AdminLocalStrategy,
    JwtStrategy,
    CommonAuthStrategy,
    JwtCommonStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
