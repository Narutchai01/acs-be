import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { PasswordModule } from 'src/core/utils/password/password.module';
import { SupabaseModule } from 'src/provider/store/supabase/supabase.module';
import { MailModule } from '../mail/mail.module';
import { ProfessorFactory } from './professor.factory';
import { UsersModule } from '../users/users.module';
import { MasterdataModule } from '../masterdata/masterdata.module';

@Module({
  imports: [
    RepositoriesModule,
    PasswordModule,
    SupabaseModule,
    MailModule,
    UsersModule,
    MasterdataModule,
  ],
  controllers: [ProfessorController],
  providers: [ProfessorService, ProfessorFactory],
})
export class ProfessorModule {}
