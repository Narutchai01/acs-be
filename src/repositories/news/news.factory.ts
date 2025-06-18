import { Injectable } from '@nestjs/common';
import { NewsEntity } from 'src/entities/news.entity';
import { NewsModel } from 'src/models/news';

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
            categoryId: data.categoryId,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt || null,
            createdBy: data.createdBy,
            updatedBy: data.updatedBy || null,
        }
    }
}
