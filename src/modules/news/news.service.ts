import { Injectable } from '@nestjs/common';
import { CreateNewsDto, CreateNewsMediaDto } from './dto/creat-news.dto';
import { NewsModel, NewsMediaModel } from 'src/models/news';
import { INewsRepository } from 'src/repositories/news/news.abstract';
import { SupabaseService } from 'src/provider/store/supabase/supabase.service';
import { QueryNewsDto } from './dto/get-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Pageable } from 'src/models';

@Injectable()
export class NewsService {
  constructor(
    private newsRespository: INewsRepository,
    private storage: SupabaseService,
  ) {}

  async createNews(
    createNews: CreateNewsDto,
    file: Express.Multer.File,
    userId: number,
  ): Promise<NewsModel> {
    const image_url = await this.storage.uploadFile(file, 'news');

    const data = {
      title: createNews.title,
      detail: createNews.detail,
      startDate: createNews.startDate,
      dueDate: createNews.dueDate || null,
      image: image_url,
      categoryId: Number(createNews.categoryId),
      createdBy: userId,
      updatedBy: userId,
    };

    return this.newsRespository.createNews(data);
  }

  async getNews(query: QueryNewsDto): Promise<Pageable<NewsModel>> {
    const [news, count] = await Promise.all([
      this.newsRespository.getNews(query),
      this.newsRespository.count(query),
    ]);
    return {
      rows: news,
      totalRecords: count,
      page: query.page || 1,
      pageSize: query.pageSize || 10,
    };
  }

  async getNewsById(id: number): Promise<NewsModel> {
    return this.newsRespository.getNewsById(id);
  }

  async updateNews(
    id: number,
    data: UpdateNewsDto,
    file: Express.Multer.File,
    userId: number,
  ): Promise<NewsModel> {
    const existingNews = await this.newsRespository.getNewsById(id);
    let image_url: string = existingNews.image;

    if (file) {
      image_url = await this.storage.uploadFile(file, 'news');
    }

    const updateData = {
      title: data.title || existingNews.title,
      detail: data.detail || existingNews.detail,
      startDate: data.startDate || existingNews.startDate,
      dueDate: data.dueDate || existingNews.dueDate,
      image: image_url,
      categoryId: Number(data.categoryId) || existingNews.categoryId,
      updatedBy: userId,
    };

    return this.newsRespository.updateNews(id, updateData);
  }

  async deleteNews(id: number, userId: number): Promise<NewsModel> {
    return this.newsRespository.deleteNews(id, userId);
  }

  async createNewsMedia(
    createNewsMedia: CreateNewsMediaDto,
    file: Express.Multer.File,
  ): Promise<NewsMediaModel> {
    const image_url = await this.storage.uploadFile(file, 'news-media');

    const newsMediaData = {
      ...createNewsMedia,
      image: image_url,
    };

    return this.newsRespository.createNewsMedia(newsMediaData);
  }
}
