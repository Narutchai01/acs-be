import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { StudentFactory } from './students.factory';
import { UsersModule } from '../users/users.module';
import { ClassBookModule } from '../class-book/class-book.module';
import { StudentsControllerV2 } from './students.controller.v2';

@Module({
  imports: [RepositoriesModule, UsersModule, ClassBookModule],
  controllers: [StudentsController, StudentsControllerV2],
  providers: [StudentsService, StudentFactory],
})
export class StudentsModule {}
