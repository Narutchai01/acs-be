import {
  CreateRefresherTokenModel,
  RefresherTokenModel,
} from 'src/models/refresher-token';

export abstract class IRefresherTokenRepository {
  abstract upsert(
    data: CreateRefresherTokenModel,
  ): Promise<RefresherTokenModel>;
}
