import { Injectable } from '@nestjs/common';
import { RefresherTokenEntity } from 'src/entities/refresher-token.entity';
import { RefresherTokenModel } from 'src/models/refresher-token';

@Injectable()
export class RefresherTokenFactory {
  mapRefresherTokenModelToRefresherTokenEntities(
    model: RefresherTokenModel,
  ): RefresherTokenEntity {
    return { ...model };
  }

  mapRefresherTokenEntityToRefresherTokenModel(
    entity: RefresherTokenEntity,
  ): RefresherTokenModel {
    return { ...entity };
  }
}
