import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/provider/database/prisma/prisma.module';

import { TypeFactory } from './type/type.factory';
import { ITypeRepositoty } from './type/type.abstact';
import { TypeRepository } from './type/type.repository';
import { IRoleRepository } from './role/role.abtract';
import { RoleRepository } from './role/role.repository';
import { RoleFactory } from './role/role.factory';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: ITypeRepositoty,
      useClass: TypeRepository,
    },
    {
      provide: IRoleRepository,
      useClass: RoleRepository,
    },
    RoleFactory,
    TypeFactory,
  ],
  exports: [ITypeRepositoty, IRoleRepository],
})
export class RepositoriesModule {}
