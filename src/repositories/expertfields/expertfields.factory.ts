import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ExpertFieldEntity } from 'src/entities/expertfields.entity';
import { ExpertFieldModel } from 'src/models/expertfields';
import { ProfessorFactory } from '../professor/professor.factory';
import { TypeFactory } from '../type/type.factory';
@Injectable()
export class ExpertFieldsFactory {
  constructor(
    @Inject(forwardRef(() => ProfessorFactory))
    private professorFactory: ProfessorFactory,
    private typeListFactory: TypeFactory,
  ) {}

  mapExpertFieldEntitiesToExpertFieldModels(
    entities: ExpertFieldEntity[],
  ): ExpertFieldModel[] {
    return entities.map((entity) =>
      this.mapExpertFieldEntityToExpertFieldModel(entity),
    );
  }

  mapExpertFieldEntityToExpertFieldModel(
    data: ExpertFieldEntity,
  ): ExpertFieldModel {
    const expertField: ExpertFieldModel = {
      id: data.id,
      professorId: data.professorId,
      field: data.field,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
      deletedDate: data.deletedDate,
    };
    return expertField;
  }
}
