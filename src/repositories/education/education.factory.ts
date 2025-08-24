import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { EducationEntity } from 'src/entities/education.entity';
import { EducationModel } from 'src/models/education';
import { ProfessorFactory } from '../professor/professor.factory';
import { EducationLevelFactory } from '../educationlevel/educationlvel.factory';

@Injectable()
export class EducationFactory {
  constructor(
    @Inject(forwardRef(() => ProfessorFactory))
    private professorFactory: ProfessorFactory,
    private educationLevelFactory: EducationLevelFactory,
  ) {}

  mapEducationEntitiesToEducationModels(
    data: EducationEntity[],
  ): EducationModel[] {
    return data.map((item) => this.mapEducationEntityToEducationModel(item));
  }

  mapEducationEntityToEducationModel(data: EducationEntity): EducationModel {
    return {
      id: data.id,
      levelId: data.levelId,
      professorId: data.professorId,
      education: data.education,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
      deletedDate: data.deletedDate,
      updatedBy: data.updatedBy,
      createdBy: data.createdBy,
      professor: data.professor
        ? this.professorFactory.mapProfessorEntityToProfessorModel(
            data.professor,
          )
        : null,
      educationLevel: this.educationLevelFactory.mapEducationLevelEntityToModel(
        data.educationLevel,
      ),
    };
  }
}
