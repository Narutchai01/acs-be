import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';

@Module({
  imports: [RepositoriesModule],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}
