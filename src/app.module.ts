import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './modules/health/health.controller';

import { PrismaModule } from './provider/database/prisma/prisma.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { UsersModule } from './modules/users/users.module';
import { ExampleModule } from './modules/example/example.module';
import { CourseModule } from './modules/course/course.module';
import { SupabaseModule } from './provider/store/supabase/supabase.module';
import { AuthModule } from './modules/auth/auth.module';
import { NewsModule } from './modules/news/news.module';
import { PasswordModule } from './core/utils/password/password.module';
import { CurriculumModule } from './modules/curriculum/curriculum.module';
import { MasterdataModule } from './modules/masterdata/masterdata.module';
import { ProfessorModule } from './modules/professor/professor.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    PrismaModule,
    RepositoriesModule,
    PasswordModule,
    UsersModule,
    ExampleModule,
    SupabaseModule,
    AuthModule,
    NewsModule,
    CourseModule,
    CurriculumModule,
    MasterdataModule,
    ProfessorModule,
    MailModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
