import { Injectable } from '@nestjs/common';
import { ExpertFieldEntity } from 'src/entities/expertfields.entity';
import { ExpertFieldModel } from 'src/models/expertfields';
import { ProfessorFactory } from '../professor/professor.factory';
import { TypeFactory } from '../type/type.factory';
@Injectable()
export class ExpertFieldsFactory {
  constructor(
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
    return {
      id: data.id,
      professorId: data.professorId,
      fieldId: data.fieldId,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
      deletedDate: data.deletedDate,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      professor: data.professor
        ? this.professorFactory.mapProfessorEntityToProfessorModel(
            data.professor,
          )
        : undefined,
      field: data.field
        ? this.typeListFactory.mapListTypeEntityToListTypeModel(data.field)
        : undefined,
    };
  }
}
