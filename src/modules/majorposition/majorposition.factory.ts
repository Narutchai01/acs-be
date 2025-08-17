import { Injectable } from '@nestjs/common';
import { MajorPositionModel } from 'src/models/majorposition';
import { MajorPositionDto } from './dto/majorposition.v1.dto';

@Injectable()
export class MajorPositionFactory {
  mapMajorPositionModelsToDtos(data: MajorPositionModel[]): MajorPositionDto[] {
    return data.map((item) => this.mapMajorPositionModelToDto(item));
  }

  mapMajorPositionModelToDto(data: MajorPositionModel): MajorPositionDto {
    return {
      id: data.id,
      positionTh: data.positionTh,
      positionEn: data.positionEn,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
    };
  }
}
