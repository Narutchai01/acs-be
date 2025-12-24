import { Injectable } from '@nestjs/common';
import { ClassBookFactory } from '../class-book/class-book.factory';
import { UsersFactory } from '../users/users.factory';
import { StudentModel } from 'src/models/student';
import { StudentDto } from './dto/v1/student.dto';

@Injectable()
export class StudentFactory {
  constructor(
    private classBookFactory: ClassBookFactory,
    private usersFactory: UsersFactory,
  ) {}

  mapStudentModelsToStudentDtos(models: StudentModel[]): StudentDto[] {
    return models.map((model) => this.mapStudentModelToStudentDto(model));
  }

  mapStudentModelToStudentDto(model: StudentModel): StudentDto {
    return {
      id: model.id,
      studentId: model.studentId,
      linkin: model.linkedin ?? null,
      facebook: model.facebook ?? null,
      instragram: model.instagram ?? null,
      github: model.github ?? null,
      classBook: model.classBook
        ? this.classBookFactory.mapClassBookModelToClassBookDto(model.classBook)
        : undefined,
      user: model.user
        ? this.usersFactory.mapUserModelToUserDto(model.user)
        : undefined,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      createdBy: model.createdBy,
      updatedBy: model.updatedBy,
    };
  }
}
