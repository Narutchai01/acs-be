import { Injectable } from '@nestjs/common';
import { UserFactory } from '../user/user.factory';
import { ProfessorEntity } from 'src/entities/professor.entity';
import { ProfessorModel } from 'src/models/professor';
import { EducationFactory } from '../education/education.factory';
import { ExpertFieldsFactory } from '../expertfields/expertfields.factory';
import { AcademicPositionFactory } from '../academicposition/academicposition.factory';
import { MajorPositionFactory } from '../majorposition/majorposition.factory';

@Injectable()
export class ProfessorFactory {
  constructor(
    private userFactory: UserFactory,
    private educationFactory: EducationFactory,
    private expertFieldFactory: ExpertFieldsFactory,
    private academicPositionFactory: AcademicPositionFactory,
    private majorPositionFactory: MajorPositionFactory,
  ) {}

  mapProfessorEntityToProfessorModel(data: ProfessorEntity): ProfessorModel {
    return {
      id: data.id,
      userId: data.userId,
      academicPositionId: data.academicPositionId,
      majorPositionId: data.majorPositionId,
      profRoom: data.profRoom,
      fieldOffexpertise: data.fieldOffexpertise,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
      deletedDate: data.deletedDate,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      user: data.user
        ? this.userFactory.mapUserEntityToUserModel(data.user)
        : null,
      education: this.educationFactory.mapEducationEntitiesToEducationModels(
        data.education,
      ),
      expertFields:
        this.expertFieldFactory.mapExpertFieldEntitiesToExpertFieldModels(
          data.expertFields,
        ),
      academicPosition: data.academicPosition
        ? this.academicPositionFactory.mapAcademicPositionEntityToAcademicPositionModel(
            data.academicPosition,
          )
        : null,
      majorPosition: data.majorPosition
        ? this.majorPositionFactory.mapMajorPositionEntityToMajorPositionModel(
            data.majorPosition,
          )
        : null,
    };
  }
}
