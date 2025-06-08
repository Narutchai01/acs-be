import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './modules/health/health.controller';
import { RoleController } from './modules/role/role.controller';
import { RoleService } from './modules/role/role.service';
import { RoleModule } from './modules/role/role.module';
import { PrismaModule } from './provider/database/prisma/prisma.module';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [RoleModule, PrismaModule, RepositoriesModule],
  controllers: [AppController, HealthController, RoleController],
  providers: [AppService, RoleService],
})
export class AppModule {}
