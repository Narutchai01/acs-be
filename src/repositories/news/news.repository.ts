import { Injectable } from '@nestjs/common';
import { INewsRepository } from './news.abstract';
import { CreateNewsModel, NewsModel } from 'src/models/news';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { NewsFactory } from './news.factory';

@Injectable()
export class NewsRepository implements INewsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly newsFactory: NewsFactory,
  ) {}

  async createNews(data: CreateNewsModel): Promise<NewsModel> {
    try {
      const news = await this.prisma.news.create({
        data,
        include: {
          category: true,
          user: true,
        },
      });
      return this.newsFactory.mapNewsEntityToNewsModel(news);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Create news failed:', error.message);
        throw new Error(`Unable to create news: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        throw new Error('Unable to create news: Unknown error occurred');
      }
    }
  }
}
