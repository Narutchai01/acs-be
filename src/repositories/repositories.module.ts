import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/provider/database/prisma/prisma.module';
import { IRoleRepository } from './role/role.abstract';
import { RoleRepository } from './role/role.repository';
import { RoleFactory } from './role/role.factory';
import { TypeFactory } from './type/type.factory';
import { ITypeRepositoty } from './type/type.abstact';
import { TypeRepository } from './type/type.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: IRoleRepository,
      useClass: RoleRepository,
    },
    {
      provide: ITypeRepositoty,
      useClass: TypeRepository,
    },
    RoleFactory,
    TypeFactory,
  ],
  exports: [IRoleRepository, ITypeRepositoty],
})
export class RepositoriesModule {}
