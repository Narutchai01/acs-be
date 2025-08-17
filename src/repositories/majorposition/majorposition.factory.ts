import { Injectable } from '@nestjs/common';
import { MajorPositionEntity } from 'src/entities/majorposition.entity';
import { MajorPositionModel } from 'src/models/majorposition';
import { UserFactory } from '../user/user.factory';

@Injectable()
export class MajorPositionFactory {
  constructor(private userFactory: UserFactory) {}

  mapMajorPositionToMajorPositionModel(
    data: MajorPositionEntity,
  ): MajorPositionModel {
    return {
      id: data.id,
      positionTh: data.positionTh,
      positionEn: data.positionEn,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
    };
  }
}
