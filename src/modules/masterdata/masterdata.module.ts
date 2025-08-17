import { Module } from '@nestjs/common';
import { MasterdataController } from './masterdata.controller.v1';
import { MajorPositionService } from '../majorposition/majorposition.service';
import { MajorPositionFactory } from '../majorposition/majorposition.factory';
import { RepositoriesModule } from 'src/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [MasterdataController],
  providers: [MajorPositionService, MajorPositionFactory],
})
export class MasterdataModule {}
