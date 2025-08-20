import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/provider/database/prisma/prisma.module';
import { TypeFactory } from './type/type.factory';
import { ITypeRepository } from './type/type.abstact';
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
import { ICurriculumRepository } from './curriculum/curriculum.abstract';
import { CurriculumRepository } from './curriculum/curriculum.repository';
import { CurriculumFactory } from './curriculum/curriculum.factory';
import { IPrevCourseRepository } from './prevcourse/prevcourse.abstract';
import { PrevCourseFactory } from './prevcourse/prevcourse.factory';
import { PrevCourseRepository } from './prevcourse/prevcourse.repository';
import { ITypeCourseRepository } from './typecourse/typecourse.abstract';
import { TypeCourseRepository } from './typecourse/typecourse.repository';
import { TypeCourseFactory } from './typecourse/typecourse.facoty';
import { IAcademicPositionRepository } from './academicposition/academicposition.abstract';
import { AcademicPositionRepository } from './academicposition/academicposition.repository';
import { AcademicPositionFactory } from './academicposition/academicposition.factory';
import { IProfessorRepository } from './professor/professor.abstract';
import { ProfessorRepository } from './professor/professor.repository';
import { ProfessorFactory } from './professor/professor.factory';
import { IEducationLevelRepository } from './educationlevel/educationlvel.abstract';
import { EducationLevelFactory } from './educationlevel/educationlvel.factory';
import { EducationLevelRepository } from './educationlevel/educationlvel.repository';
import { MajorPositionFactory } from './majorposition/majorposition.factory';
import { IMajorPositionRepository } from './majorposition/majorposition.abstract';
import { MajorPositionRepository } from './majorposition/majorposition.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: ITypeRepository,
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
    {
      provide: ICurriculumRepository,
      useClass: CurriculumRepository,
    },
    {
      provide: IPrevCourseRepository,
      useClass: PrevCourseRepository,
    },
    {
      provide: ITypeCourseRepository,
      useClass: TypeCourseRepository,
    },
    {
      provide: IAcademicPositionRepository,
      useClass: AcademicPositionRepository,
    },
    {
      provide: IProfessorRepository,
      useClass: ProfessorRepository,
    },
    {
      provide: IEducationLevelRepository,
      useClass: EducationLevelRepository,
    },
    {
      provide: IMajorPositionRepository,
      useClass: MajorPositionRepository,
    },
    MajorPositionFactory,
    EducationLevelFactory,
    NewsFactory,
    RoleFactory,
    TypeFactory,
    UserFactory,
    AdminFactory,
    ExampleFactory,
    CourseFactory,
    CurriculumFactory,
    PrevCourseFactory,
    TypeCourseFactory,
    AcademicPositionFactory,
    ProfessorFactory,
  ],
  exports: [
    ITypeRepository,
    IRoleRepository,
    IUserRepository,
    IAdminRepository,
    IExampleRepository,
    INewsRepository,
    ICourseRepository,
    ICurriculumRepository,
    IPrevCourseRepository,
    ITypeCourseRepository,
    IAcademicPositionRepository,
    IProfessorRepository,
    IEducationLevelRepository,
    IMajorPositionRepository,
  ],
})
export class RepositoriesModule {}
