import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/provider/database/prisma/prisma.module';
import { TypeFactory } from './type/type.factory';
import { ITypeRepositoty } from './type/type.abstact';
import { TypeRepository } from './type/type.repository';
import { IRoleRepository } from './role/role.abtract';
import { RoleRepository } from './role/role.repository';
import { RoleFactory } from './role/role.factory';
import { UserFactory } from './user/user.factory';
import { IUserRepository } from './user/user.abstract';
import { UserRepository } from './user/user.repository';
import { AdminFactory } from './admin/admin.factory';
import { IAdminRepository } from './admin/admin.abstract';
import { AdminRepository } from './admin/admin.repository';
import { ExampleFactory } from './example/example.factory';
import { IExampleRepository } from './example/example.abstract';
import { NewsFactory } from './news/news.factory';
import { INewsRepository } from './news/news.abtract';
import { ExampleRepository } from './example/example.repository';
import { NewsRepository } from './news/news.repository';

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
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IAdminRepository,
      useClass: AdminRepository,
    },
    {
      provide: IExampleRepository,
      useClass: ExampleRepository,
    },
    {
      provide: INewsRepository,
      useClass: NewsRepository
    },

    RoleFactory,
    TypeFactory,
    UserFactory,
    AdminFactory,
    ExampleFactory,
    NewsFactory,
  ],
  exports: [
    ITypeRepositoty,
    IRoleRepository,
    IUserRepository,
    IAdminRepository,
    IExampleRepository,
    INewsRepository,
  ],
})
export class RepositoriesModule {}
