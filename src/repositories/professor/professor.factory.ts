import { Injectable } from '@nestjs/common';
import { UserFactory } from '../user/user.factory';
import { ProfessorEntity } from 'src/entities/professor.entity';
import { ProfessorModel } from 'src/models/professor';

@Injectable()
export class ProfessorFactory {
  constructor(private userFactory: UserFactory) {}

  mapProfessorEntitiesToProfessorModels(
    entities: ProfessorEntity[],
  ): ProfessorModel[] {
    return entities.map((entity) =>
      this.mapProfessorEntityToProfessorModel(entity),
    );
  }

  mapProfessorEntityToProfessorModel(data: ProfessorEntity): ProfessorModel {
    const professorModel = {
      id: data.id,
      userId: data.userId,
      academicPosition: data.academicPosition,
      majorPosition: data.majorPosition,
      profRoom: data.profRoom,
      fieldOfExpertise: data.fieldOfExpertise,
      createdAt: data.createdDate,
      updatedAt: data.updatedDate,
      deletedAt: data.deletedDate,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      user: this.userFactory.mapUserEntityToUserModel(data.user),
    };

    return professorModel;
  }
}
