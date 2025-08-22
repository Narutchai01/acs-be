import { Injectable } from '@nestjs/common';
import { CreateNewsModel, NewsModel, UpdateNewsModel,  NewsMediaModel, } from 'src/models/news';
import { QueryNewsDto } from 'src/modules/news/dto/get-news.dto';

@Injectable()
export abstract class INewsRepository {
  constructor() {}
  abstract createNews(data: CreateNewsModel): Promise<NewsModel>;
  abstract getNews(query: QueryNewsDto): Promise<NewsModel[]>;
  abstract getNewsById(id: number): Promise<NewsModel>;
  abstract updateNews(id: number, data: UpdateNewsModel): Promise<NewsModel>;
  abstract deleteNews(id: number, userId: number): Promise<NewsModel>;
  abstract count(query: QueryNewsDto): Promise<number>;
  abstract getNewsMedia(): Promise<NewsMediaModel[]>;
}
