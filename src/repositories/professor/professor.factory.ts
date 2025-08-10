import { Injectable } from '@nestjs/common';
import { UserFactory } from '../user/user.factory';
import { ProfessorModel } from 'src/models/professor';
import { ProfessorEntity } from 'src/entities/professor.entity';

@Injectable()
export class ProfessorFactory {
  constructor(private userFactory: UserFactory) {}

  mapProfessorEntitiesToProfessorModel(
    entities: ProfessorEntity[],
  ): ProfessorModel[] {
    return entities.map((entity) =>
      this.mapProfessorEntityToProfessorModel(entity),
    );
  }

  mapProfessorEntityToProfessorModel(data: ProfessorEntity): ProfessorModel {
    const professorModel: ProfessorModel = {
      id: data.id,
      userId: data.userId,
      academicPosition: data.academicPosition,
      majorPosition: data.majorPosition,
      profRoom: data.profRoom,
      fieldOffexpertise: data.fieldOffexpertise,
      createdDate: data.createdDate,
      createdBy: data.createdBy,
      updatedDate: data.updatedDate,
      updatedBy: data.updatedBy,
      deletedDate: data.deletedDate,
      user: this.userFactory.mapUserEntityToUserModel(data.user),
    };

    return professorModel;
  }
}
