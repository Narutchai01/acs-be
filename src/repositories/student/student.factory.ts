import { Injectable } from '@nestjs/common';
import { StudentEntity } from 'src/entities/student.entity';
import { StudentModel } from 'src/models/student';
import { ClassBookFactory } from '../class-book/class-book.factory';
import { UserFactory } from '../user/user.factory';

@Injectable()
export class StudentFactory {
  constructor(
    private classBookFactory: ClassBookFactory,
    private userFactory: UserFactory,
  ) {}

  mapStudentEntityToStudentModels(entities: StudentEntity[]): StudentModel[] {
    return entities.map((entity) =>
      this.mapStudentEntityToStudentModel(entity),
    );
  }

  mapStudentEntityToStudentModel(entity: StudentEntity): StudentModel {
    return {
      id: entity.id,
      userId: entity.userId,
      studentId: entity.studentId,
      linkedin: entity.linkedin ?? undefined,
      facebook: entity.facebook ?? undefined,
      instagram: entity.instagram ?? undefined,
      github: entity.github ?? undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? undefined,
      createdBy: entity.createdBy ?? undefined,
      updatedBy: entity.updatedBy ?? undefined,
      user: entity.user
        ? this.userFactory.mapUserEntityToUserModel(entity.user)
        : undefined,
      classBook: entity.classBook
        ? this.classBookFactory.mapEntityToModel(entity.classBook)
        : undefined,
    };
  }
}
