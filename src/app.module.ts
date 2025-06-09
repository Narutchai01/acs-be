import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './modules/health/health.controller';

import { PrismaModule } from './provider/database/prisma/prisma.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { TypeController } from './modules/type/type.controller';
import { TypeService } from './modules/type/type.service';
import { TypeModule } from './modules/type/type.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [PrismaModule, RepositoriesModule, TypeModule, RoleModule],
  controllers: [AppController, HealthController, TypeController],
  providers: [AppService, TypeService],
})
export class AppModule {}
