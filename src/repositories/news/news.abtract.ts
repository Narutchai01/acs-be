import { Injectable } from '@nestjs/common';
import { NewsModel, NewsModelCreate, NewsModelUpdate } from 'src/models/news';

@Injectable()
export abstract class INewsRepository {
    abstract getNews(): Promise<NewsModel[] | Error>;
    abstract getNewsById(id: number): Promise<NewsModel | Error>;
    abstract createNews(data: NewsModelCreate): Promise<NewsModel | Error>;
    abstract updateNews(data: NewsModelUpdate): Promise<NewsModel | Error>;
    abstract deleteNews(id: number): Promise<boolean>;
}
