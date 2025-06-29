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
import { ExampleRepository } from './example/example.repository';
import { NewsFactory } from './news/news.factory';
import { NewsRepository } from './news/news.repository';
import { INewsRepository } from './news/news.abstract';
import { CourseFactory } from './course/course.factory';
import { CourseRepository } from './course/course.repository';
import { ICourseRepository } from './course/course.abstract';

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
      useClass: NewsRepository,
    },
    {
      provide: ICourseRepository,
      useClass: CourseRepository,
    },
    NewsFactory,
    RoleFactory,
    TypeFactory,
    UserFactory,
    AdminFactory,
    ExampleFactory,
    CourseFactory,
  ],
  exports: [
    ITypeRepositoty,
    IRoleRepository,
    IUserRepository,
    IAdminRepository,
    IExampleRepository,
    INewsRepository,
    ICourseRepository,
  ],
})
export class RepositoriesModule {}
