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
      ...data,
      deletedAt: data.deletedAt ?? undefined,
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
