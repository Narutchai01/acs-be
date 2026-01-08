import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateNewsDto, CreateNewsMediaDto } from './dto/creat-news.dto';
import {
  NewsModel,
  NewsMediaModel,
  UpsertNewsMediaModel,
} from 'src/models/news';
import { INewsRepository } from 'src/repositories/news/news.abstract';
import { SupabaseService } from 'src/provider/store/supabase/supabase.service';
import { QueryNewsDto } from './dto/get-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Pageable } from 'src/models';
import { ITypeRepository } from 'src/repositories/type/type.abstact';
import { QueryNewsMediaDto } from './dto/get-newsmedia.dto';
import { UpsertNewsMediaDTO } from './dto/news_media/usert-news-media.dto';

@Injectable()
export class NewsService {
  constructor(
    private readonly newsRepository: INewsRepository,
    private readonly storage: SupabaseService,
    private readonly typeRepository: ITypeRepository,
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

    return this.newsRepository.createNews(data);
  }

  async getNews(query: QueryNewsDto): Promise<Pageable<NewsModel>> {
    const [news, count] = await Promise.all([
      this.newsRepository.getNews(query),
      this.newsRepository.count(query),
    ]);
    return {
      rows: news,
      totalRecords: count,
      page: query.page || 1,
      pageSize: query.pageSize || 10,
    };
  }

  async getNewsById(id: number): Promise<NewsModel> {
    return this.newsRepository.getNewsById(id);
  }

  async updateNews(
    id: number,
    data: UpdateNewsDto,
    file: Express.Multer.File,
    userId: number,
  ): Promise<NewsModel> {
    const existingNews = await this.newsRepository.getNewsById(id);
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

    return this.newsRepository.updateNews(id, updateData);
  }

  async deleteNews(id: number, userId: number): Promise<NewsModel> {
    return this.newsRepository.deleteNews(id, userId);
  }

  async createNewsMedia(
    createNewsMedia: CreateNewsMediaDto,
    file: Express.Multer.File,
    userId: number,
    type: string,
  ): Promise<NewsMediaModel> {
    const typeData = await this.typeRepository.getListTypeByName(type);
    if (!typeData)
      throw new HttpException(
        ` type with name ${type} not found `,
        HttpStatus.NOT_FOUND,
      );

    const image_url = await this.storage.uploadFile(file, 'news-media');

    const newsMediaData = {
      newsId: Number(createNewsMedia.newsId),
      typeId: typeData.id,
      image: image_url,
      createdBy: userId,
      updatedBy: userId,
    };

    return this.newsRepository.createNewsMedia(newsMediaData);
  }

  async getNewsMedia(query: QueryNewsMediaDto): Promise<NewsMediaModel[]> {
    const type = await this.typeRepository.getListTypeByName(query.type);
    if (!type)
      throw new HttpException(
        ` type with name ${query.type} not found `,
        HttpStatus.NOT_FOUND,
      );
    const typeId = type.id;
    return this.newsRepository.getNewsMedia(
      typeId,
      query.isUser,
      query.pageSize,
    );
  }

  async upsertNewsMedia(
    data: UpsertNewsMediaDTO,
    image: Express.Multer.File,
    createBy: number,
  ): Promise<NewsMediaModel> {
    const image_url = await this.storage.uploadFile(image, 'news-media');

    const dataToUpsert: UpsertNewsMediaModel = {
      id: data.id,
      newsId: data.newsId,
      typeId: data.typeId,
      image: image_url,
      createdBy: createBy,
      updatedBy: createBy,
    };

    return this.newsRepository.upsertNewsMediaV2(dataToUpsert);
  }
}
