import { Injectable } from '@nestjs/common';
import { ProfessorModel } from 'src/models/professor';
import { ProfessorDto } from './dto/professor.dto';

@Injectable()
export class ProfessorFactory {
  constructor() {}

  mapProfessorModelsToProfessorDtos(data: ProfessorModel[]): ProfessorDto[] {
    return data.map((item) => this.mapProfessorModelToProfessorDto(item));
  }

  mapProfessorModelToProfessorDto(data: ProfessorModel): ProfessorDto {
    const dto = {
      id: data.id,
      userId: data.userId,
      academicPosition: data.academicPosition,
      majorPosition: data.majorPosition,
      profRoom: data.profRoom,
      fieldOffexpertise: data.fieldOffexpertise,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
      deletedDate: data.deletedDate,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    };
    return dto;
  }
}
