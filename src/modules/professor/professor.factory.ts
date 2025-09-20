import { Injectable } from '@nestjs/common';
import { UsersFactory } from '../users/users.factory';
import { ProfessorModel } from 'src/models/professor';
import { ProfessorDtoV1 } from './dto/professor.dto.v1';
import { MasterDataFactoryV1 } from '../masterdata/masterdata.factory.v1';
import { EducationDtoV1 } from './dto/education.dto.v1';
import { EducationModel } from 'src/models/education';
import { ExpertFieldModel } from 'src/models/expertfields';
import { ExpertFieldsDtoV1 } from './dto/exprt-fields.dto.v1';

@Injectable()
export class ProfessorFactory {
  constructor(
    private userFactory: UsersFactory,
    private masterDataFactory: MasterDataFactoryV1,
  ) {}

  mapExpertFieldModelsToExpertFieldDtos(
    data: ExpertFieldModel[],
  ): ExpertFieldsDtoV1[] {
    return data.map((item) => this.mapExpertFieldModelToExpertFieldDto(item));
  }

  mapExpertFieldModelToExpertFieldDto(
    data: ExpertFieldModel,
  ): ExpertFieldsDtoV1 {
    return {
      id: data.id,
      field: data.field,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  mapEducationModelsToEducationDtos(data: EducationModel[]): EducationDtoV1[] {
    return data.map((item) => this.mapEducationModelToEducationDto(item));
  }

  mapEducationModelToEducationDto(data: EducationModel): EducationDtoV1 {
    return {
      education: data.education,
      university: data.university,
      level: this.masterDataFactory.mapEducationModelToDto(data.educationLevel),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    };
  }

  mapProfessorModelToProfessorDto(data: ProfessorModel): ProfessorDtoV1 {
    const result = {
      id: data.id,
      profRoom: data.profRoom,
      phone: data.phone,
      academicPosition: data.academicPosition
        ? this.masterDataFactory.mapAcademicPositionModelToDto(
            data.academicPosition,
          )
        : null,
      majorPosition: data.majorPosition
        ? this.masterDataFactory.mapMajorPositionModelToDto(data.majorPosition)
        : null,
      educations: data.education
        ? this.mapEducationModelsToEducationDtos(data.education)
        : [],
      user: data.user
        ? this.userFactory.mapUserModelToUserDto(data.user)
        : null,
      expertFields: data.expertFields
        ? this.mapExpertFieldModelsToExpertFieldDtos(data.expertFields)
        : [],
    };

    return result;
  }
}
