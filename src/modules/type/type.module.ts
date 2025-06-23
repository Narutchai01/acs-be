import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { TypeFactory } from './type.factory';

@Module({
  imports: [RepositoriesModule],
  controllers: [TypeController],
  providers: [TypeService, TypeFactory],
})
export class TypeModule {}
