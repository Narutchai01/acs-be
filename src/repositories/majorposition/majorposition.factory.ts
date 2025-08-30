import { Injectable } from '@nestjs/common';
import { MajorPositionEntity } from 'src/entities/majorposition.entity';
import { MajorPositionModel } from 'src/models/majorposition';
import { UserFactory } from '../user/user.factory';

@Injectable()
export class MajorPositionFactory {
  constructor(private userFactory: UserFactory) {}

  mapMajorPositionEnitiesToMajorPositionModels(
    data: MajorPositionEntity[],
  ): MajorPositionModel[] {
    return data.map((item) =>
      this.mapMajorPositionEntityToMajorPositionModel(item),
    );
  }

  mapMajorPositionEntityToMajorPositionModel(
    data: MajorPositionEntity,
  ): MajorPositionModel {
    return {
      id: data.id,
      positionTh: data.positionTh,
      positionEn: data.positionEn,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
