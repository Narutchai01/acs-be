import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './modules/health/health.controller';

import { PrismaModule } from './provider/database/prisma/prisma.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { TypeModule } from './modules/type/type.module';
import { RoleModule } from './modules/role/role.module';
import { UsersModule } from './modules/users/users.module';
import { ExampleModule } from './modules/example/example.module';

import { SupabaseModule } from './provider/store/supabase/supabase.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { NewsModule } from './modules/news/news.module';

@Module({
  imports: [
    PrismaModule,
    RepositoriesModule,
    TypeModule,
    RoleModule,
    UsersModule,
    ExampleModule,
    SupabaseModule,
    AdminModule,
    AuthModule,
    NewsModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
