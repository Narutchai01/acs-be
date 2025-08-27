import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { PasswordModule } from 'src/core/utils/password/password.module';
import { SupabaseModule } from 'src/provider/store/supabase/supabase.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [RepositoriesModule, PasswordModule, SupabaseModule, MailModule],
  controllers: [ProfessorController],
  providers: [ProfessorService],
})
export class ProfessorModule {}
