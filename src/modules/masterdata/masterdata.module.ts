import { Module } from '@nestjs/common';
import { MasterdataService } from './masterdata.service';
import { MasterdataControllerV1 } from './masterdata.controller.v1';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { MasterDataFactoryV1 } from './masterdata.factory.v1';

@Module({
  imports: [RepositoriesModule],
  controllers: [MasterdataControllerV1],
  providers: [MasterdataService, MasterDataFactoryV1],
})
export class MasterdataModule {}
