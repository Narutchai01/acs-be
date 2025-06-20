import { Injectable } from '@nestjs/common';
import { NewsModel } from 'src/models/news';

@Injectable()
export class NewsFactory {
  mapNewsModelToDto(data: NewsModel): NewsModel {
    return {
      id: data.id,
      title: data.title,
      image: data.image,
      detail: data.detail,
      categoryId: data.categoryId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      startDate: data.startDate,
      dueDate: data.dueDate,
    };
  }
}
