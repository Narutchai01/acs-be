import { Injectable } from '@nestjs/common';
import { INewsRepository } from './news.abstract';
import { CreateNewsModel, NewsModel, UpdateNewsModel } from 'src/models/news';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { NewsFactory } from './news.factory';
import { QueryNewsDto } from 'src/modules/news/dto/get-news.dto';
import calculatePagination from 'src/core/utils/calculatePagination';

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

  async getNews(quey: QueryNewsDto): Promise<NewsModel[]> {
    try {
      const { page, pageSize, category } = quey;
      const safeCategory = category ?? '';
      const categories = safeCategory.split(',').map((cat) => cat.trim());

      // condition query
      const whereClause = {
        deletedAt: null,
        ...(safeCategory !== '' && {
          category: {
            name: { in: categories },
          },
        }),
      };

      const newsEntities = await this.prisma.news.findMany({
        where: whereClause,
        include: {
          category: true,
          user: true,
        },
        take: pageSize,
        skip: calculatePagination(page, pageSize),
      });
      return this.newsFactory.mapNewsEntitiesToNewsModels(newsEntities);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Get news failed:', error.message);
        throw new Error(`Unable to get news: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        throw new Error('Unable to get news: Unknown error occurred');
      }
    }
  }

  async getNewsById(id: number): Promise<NewsModel> {
    try {
      const newsEntity = await this.prisma.news.findUnique({
        where: { id: id },
        include: {
          category: true,
          user: true,
        },
      });
      if (!newsEntity) {
        throw new Error(`News not found for ID ${id}`);
      }
      return this.newsFactory.mapNewsEntityToNewsModel(newsEntity);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Get news by ID failed:', error.message);
        throw new Error(`Unable to get news by ID: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        throw new Error('Unable to get news by ID: Unknown error occurred');
      }
    }
  }

  async updateNews(id: number, data: UpdateNewsModel): Promise<NewsModel> {
    try {
      // Ensure updatedBy is undefined instead of null for Prisma compatibility
      const updateData = {
        ...data,
        updatedBy: data.updatedBy === null ? undefined : data.updatedBy,
      };
      const newsEntity = await this.prisma.news.update({
        where: { id: id },
        data: updateData,
        include: {
          category: true,
          user: true,
        },
      });
      return this.newsFactory.mapNewsEntityToNewsModel(newsEntity);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Update news failed:', error.message);
        throw new Error(`Unable to update news: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        throw new Error('Unable to update news: Unknown error occurred');
      }
    }
  }

  async deleteNews(id: number, userId: number): Promise<NewsModel> {
    try {
      const newsEntity = await this.prisma.news.update({
        where: { id: id },
        data: {
          deletedDate: new Date(),
          updatedBy: userId,
        },
        include: {
          category: true,
          user: true,
        },
      });
      return this.newsFactory.mapNewsEntityToNewsModel(newsEntity);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Delete news failed:', error.message);
        throw new Error(`Unable to delete news: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        throw new Error('Unable to delete news: Unknown error occurred');
      }
    }
  }
}
