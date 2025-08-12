import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { ProfessorFactory } from './professor.factory';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [RepositoriesModule, UsersModule],
  controllers: [ProfessorController],
  providers: [ProfessorService, ProfessorFactory],
})
export class ProfessorModule {}
