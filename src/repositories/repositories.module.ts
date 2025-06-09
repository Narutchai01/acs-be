import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/provider/database/prisma/prisma.module';

import { TypeFactory } from './type/type.factory';
import { ITypeRepositoty } from './type/type.abstact';
import { TypeRepository } from './type/type.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: ITypeRepositoty,
      useClass: TypeRepository,
    },
    TypeFactory,
  ],
  exports: [ITypeRepositoty],
})
export class RepositoriesModule {}
