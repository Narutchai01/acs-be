import { Injectable } from '@nestjs/common';
import { CreateNewsModel, NewsModel } from 'src/models/news';

@Injectable()
export abstract class INewsRepository {
  constructor() {}
  abstract createNews(data: CreateNewsModel): Promise<NewsModel>;
}
