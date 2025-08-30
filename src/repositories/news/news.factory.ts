import { Injectable } from '@nestjs/common';
import { TypeFactory } from '../type/type.factory';
import { UserFactory } from '../user/user.factory';
import { NewsEntity } from 'src/entities/news.entity';
import { NewsModel } from 'src/models/news';
import { NewsMediaEntity } from 'src/entities/news.entity';
import { NewsMediaModel } from 'src/models/news';

// Type for News with included relations

@Injectable()
export class NewsFactory {
  constructor(
    private typeFactory: TypeFactory,
    private userFactory: UserFactory,
  ) {}

  mapNewsEntitiesToNewsModels(entities: NewsEntity[]): NewsModel[] {
    return entities.map((entity) => this.mapNewsEntityToNewsModel(entity));
  }

  mapNewsEntityToNewsModel(data: NewsEntity): NewsModel {
    const newsModel = {
      ...data,
      deletedAt: data.deletedAt || null,
      category: this.typeFactory.mapListTypeEntityToListTypeModel(
        data.category,
      ),
      user: this.userFactory.mapUserEntityToUserModel(data.user),
    };

    return newsModel;
  }

  mapNewsMediaEntitiesToNewsMediaModels(
    entities: NewsMediaEntity[],
  ): NewsMediaModel[] {
    return entities.map((entity) =>
      this.mapNewsMediaEntityToNewsMediaModel(entity),
    );
  }

  mapNewsMediaEntityToNewsMediaModel(data: NewsMediaEntity): NewsMediaModel {
    const newsMediaModel = {
      ...data,
      deletedAt: data.deletedAt || undefined,
      news: this.mapNewsEntityToNewsModel(data.news),
      type: data.type
        ? this.typeFactory.mapListTypeEntityToListTypeModel(data.type)
        : null,
      user: data.user
        ? this.userFactory.mapUserEntityToUserModel(data.user)
        : null,
    };

    return newsMediaModel;
  }
}
