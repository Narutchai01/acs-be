import { Injectable } from '@nestjs/common';
import { majorPositionModel } from 'src/models/majorposition';
import { MajorPositionDto } from './dto/majorposition.dto';

@Injectable()
export class MajorPositionFactory {
  mapMajorPositionModelsToDtos(data: majorPositionModel[]): MajorPositionDto[] {
    return data.map((item) => this.mapMajorPositionModelToDto(item));
  }

  mapMajorPositionModelToDto(data: majorPositionModel): MajorPositionDto {
    return {
      id: data.id,
      positionTh: data.positionTh,
      positionEn: data.positionEn,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    };
  }
}
