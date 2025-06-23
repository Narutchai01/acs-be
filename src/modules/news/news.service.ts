import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/creat-news.dto';
import { NewsModel } from 'src/models/news';
import { INewsRepository } from 'src/repositories/news/news.abstract';
import { SupabaseService } from 'src/provider/store/supabase/supabase.service';
import { QueryNewsDto } from './dto/get-news.dto';

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

  async getNews(query: QueryNewsDto): Promise<NewsModel[]> {
    return this.newsRespository.getNews(query);
  }
}
