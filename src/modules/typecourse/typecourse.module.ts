import { Module } from '@nestjs/common';
import { TypecourseService } from './typecourse.service';
import { TypecourseController } from './typecourse.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { TypeCourseFactory } from './typecourse.factory';

@Module({
  imports: [RepositoriesModule],
  controllers: [TypecourseController],
  providers: [TypecourseService, TypeCourseFactory],
})
export class TypecourseModule {}
