import { Injectable } from '@nestjs/common';
import { CreateNewsModel, NewsModel } from 'src/models/news';
import { QueryNewsDto } from 'src/modules/news/dto/get-news.dto';

@Injectable()
export abstract class INewsRepository {
  constructor() {}
  abstract createNews(data: CreateNewsModel): Promise<NewsModel>;
  abstract getNews(query: QueryNewsDto): Promise<NewsModel[]>;
}
