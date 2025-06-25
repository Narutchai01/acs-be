import { Injectable } from '@nestjs/common';
import { NewsModel } from 'src/models/news';
import { NewsDto } from './dto/news.dto';

@Injectable()
export class NewsFactory {
  constructor() {}

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
}
