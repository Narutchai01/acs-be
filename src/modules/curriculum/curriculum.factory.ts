import { Injectable } from '@nestjs/common';
import { CurriculumModel } from 'src/models/curriculum';
import { CurriculumDto } from './dto/curriculum.dto';

@Injectable()
export class CurriculumFactory {
  constructor() {}

  mapCurriculumModelToCurriculumDto(data: CurriculumModel): CurriculumDto {
    const dto: CurriculumDto = {
      id: data.id,
      year: data.year,
      fileUrl: data.fileUrl,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
    };

    return dto;
  }
}
