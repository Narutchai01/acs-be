import { Injectable } from '@nestjs/common';
import { NewsEntity } from 'src/entities/news.entity';
import { NewsModel } from 'src/models/news';
import { ListTypeModel } from 'src/models/type';
import { UserModel } from 'src/models/user';

@Injectable()
export class NewsFactory {
    mapNewsEntitiesToNewsModels(data: NewsEntity[]): NewsModel[] {
        return data.map((news) => this.mapNewsEntityToNewsModel(news));
    }

    mapNewsEntityToNewsModel(data: NewsEntity): NewsModel {
        return {
            id: data.id,
            title: data.title,
            image: data.image,
            detail: data.detail,
            categoryId: { id: data.categoryId } as ListTypeModel,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            createdBy: { id: data.createdBy } as UserModel,
            updatedBy: { id: data.updatedBy } as UserModel,
            startDate: data.startDate,
            dueDate: data.dueDate,
        };
    }
}
