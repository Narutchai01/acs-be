import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './modules/health/health.controller';
import { RoleController } from './modules/role/role.controller';
import { RoleService } from './modules/role/role.service';
import { RoleModule } from './modules/role/role.module';
import { PrismaModule } from './provider/database/prisma/prisma.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { TypeController } from './modules/type/type.controller';
import { TypeService } from './modules/type/type.service';
import { TypeModule } from './modules/type/type.module';

@Module({
  imports: [RoleModule, PrismaModule, RepositoriesModule, TypeModule],
  controllers: [
    AppController,
    HealthController,
    RoleController,
    TypeController,
  ],
  providers: [AppService, RoleService, TypeService],
})
export class AppModule {}
