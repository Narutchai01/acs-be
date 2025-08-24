import { Injectable } from '@nestjs/common';
import { NewsModel, NewsMediaModel } from 'src/models/news';
import { NewsDto } from './dto/news.dto';
import { NewsMediaDto } from './dto/newsmedia.dto';
import { TypeFactory } from '../type/type.factory';

@Injectable()
export class NewsFactory {
  constructor(private typeFactory: TypeFactory) {}

  mapNewsModelsToNewsDtos(data: NewsModel[]): NewsDto[] {
    return data.map((item) => this.mapNewsModelToNewsDto(item));
  }

  mapNewsModelToNewsDto(data: NewsModel): NewsDto {
    const dto = {
      id: data.id,
      title: data.title,
      image: data.image,
      detail: data.detail,
      startDate: data.startDate,
      dueDate: data.dueDate,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
      deletedDate: data.deletedDate,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      category: data.category,
    };
    return dto;
  }

  mapNewsMediaModelsToNewsMediaDtos(data: NewsMediaModel[]): NewsMediaDto[] {
    return data.map((item) => this.mapNewsMediaModelToNewsMediaDto(item));
  }

  mapNewsMediaModelToNewsMediaDto(data: NewsMediaModel): NewsMediaDto {
    const newsMediaDto = {
      id: data.id,
      image: data.image,
      newsId: data.newsId,
      typeId: data.typeId,
      createdAt: data.createdDate,
      updatedAt: data.updatedDate,
      deletedAt: data.deletedDate,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      news: this.mapNewsModelToNewsDto(data.news),
      type: data.type
        ? this.typeFactory.mapListTypeModelToListTypeDto(data.type)
        : null,
    };
    return newsMediaDto;
  }
}
