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
import { EducationFactory } from './education/education.factory';
import { IEducationRepository } from './education/education.abstract';
import { EducationRepository } from './education/education.repository';
import { ExpertFieldsFactory } from './expertfields/expertfields.factory';
import { IExpertFieldsRepository } from './expertfields/expertfields.abstract';
import { ExpertFieldsRepository } from './expertfields/expertfields.repository';
import { IClassBookRepository } from './class-book/class-book.abstract';
import { ClassBookRepository } from './class-book/class-book.repository';
import { ClassBookFactory } from './class-book/class-book.factory';
import { IStudentRepository } from './student/student.abstract';
import { StudentRepository } from './student/student.repository';
import { StudentFactory } from './student/student.factory';
import { IRefresherTokenRepository } from 'src/repositories/refreshertoken/refresher.abstract';
import { RefresherTokenRepository } from './refreshertoken/refresher.repository';
import { RefresherTokenFactory } from './refreshertoken/refresher.factory';
import { IProjectRepository } from './project/project.abstract';
import { ProjectFactory } from './project/project.factory';
import { ProjectRepository } from './project/project.repository';
import { AuthRepository } from './auth/auth.repository';
import { IAuthRepository } from './auth/auth.abstract';
import { AuthFactory } from './auth/auth.factory';

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
    {
      provide: IEducationRepository,
      useClass: EducationRepository,
    },
    {
      provide: IExpertFieldsRepository,
      useClass: ExpertFieldsRepository,
    },
    {
      provide: IClassBookRepository,
      useClass: ClassBookRepository,
    },
    {
      provide: IStudentRepository,
      useClass: StudentRepository,
    },
    {
      provide: IRefresherTokenRepository,
      useClass: RefresherTokenRepository,
    },
    {
      provide: IProjectRepository,
      useClass: ProjectRepository,
    },
    {
      provide: IAuthRepository,
      useClass: AuthRepository,
    },
    AuthFactory,
    ProjectFactory,
    RefresherTokenFactory,
    StudentFactory,
    ClassBookFactory,
    MajorPositionFactory,
    EducationLevelFactory,
    NewsFactory,
    RoleFactory,
    TypeFactory,
    UserFactory,
    ExampleFactory,
    CourseFactory,
    CurriculumFactory,
    PrevCourseFactory,
    TypeCourseFactory,
    AcademicPositionFactory,
    ProfessorFactory,
    EducationFactory,
    ExpertFieldsFactory,
  ],
  exports: [
    ITypeRepository,
    IRoleRepository,
    IUserRepository,
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
    IEducationRepository,
    IExpertFieldsRepository,
    IClassBookRepository,
    IStudentRepository,
    IRefresherTokenRepository,
    IProjectRepository,
    IAuthRepository,
  ],
})
export class RepositoriesModule {}
