import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/provider/database/prisma/prisma.module';
import { IRoleRepository } from './role/role.abstract';
import { RoleRepository } from './role/role.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: IRoleRepository,
      useClass: RoleRepository,
    },
  ],
  exports: [IRoleRepository],
})
export class RepositoriesModule {}
