import { Injectable } from '@nestjs/common';
import { TypeFactory } from '../type/type.factory';
import { UserFactory } from '../user/user.factory';
import { NewsEntity } from 'src/entities/news.entity';
import { NewsModel } from 'src/models/news';

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
      id: data.id,
      title: data.title,
      image: data.image,
      detail: data.detail,
      categoryId: data.categoryId,
      startDate: data.startDate,
      dueDate: data.dueDate,
      createdAt: data.createdDate,
      updatedAt: data.updatedDate,
      deletedAt: data.deletedDate,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      category: this.typeFactory.mapListTypeEntityToListTypeModel(
        data.category,
      ),
      user: this.userFactory.mapUserEntityToUserModel(data.user),
    };

    return newsModel;
  }
}
