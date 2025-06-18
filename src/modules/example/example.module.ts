import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';
import { ExampleFactory } from './exampler.factory';
import { RepositoriesModule } from 'src/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [ExampleController],
  providers: [ExampleService, ExampleFactory],
})
export class ExampleModule {}
