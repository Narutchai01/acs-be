import { Injectable } from '@nestjs/common';
import {NewsModel, NewsModelCreate, NewsModelUpdate,} from 'src/models/news';
import { INewsRepository } from 'src/repositories/news/news.abtract';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: INewsRepository) {}

  async getNews(): Promise<NewsModel[] | Error> {
    return this.newsRepository.getNews();
  }

  async getNewsById(id: number): Promise<NewsModel | Error> {
    return this.newsRepository.getNewsById(id);
  }

  async createNews(data: NewsModelCreate): Promise<NewsModel | Error> {
    return this.newsRepository.createNews(data);
  }

  async updateNews(data: NewsModelUpdate): Promise<NewsModel | Error> {
    return this.newsRepository.updateNews(data);
  }

  async deleteNews(id: number): Promise<boolean> {
    return this.newsRepository.deleteNews(id);
  }
}
