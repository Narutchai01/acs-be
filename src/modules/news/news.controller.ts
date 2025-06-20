import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  Get,
  Param,
  Headers,
  Put,
  Delete,
  UploadedFiles,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news';
import { UpdateNewsDto } from './dto/update-news';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Get()
  async getNews() {
    try {
      return await this.newsService.getNews();
    } catch (error) {
      return {
        statusCode: 500,
        message: `Failed to get news: ${error instanceof Error ? error.message : error}`,
      };
    }
  }

  @Get(':id')
  async getNewsById(@Param('id') id: string) {
    try {
      return await this.newsService.getNewsById(Number(id));
    } catch (error) {
      return {
        statusCode: 500,
        message: `Failed to get news by ID: ${error instanceof Error ? error.message : error}`,
      };
    }
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async createNews(
    @Body() dto: CreateNewsDto,
    @Headers('authorization') token: string) {
    try {
      const now = new Date();
      const userId = parseInt(token, 10);//change to JWT prase
      return await this.newsService.createNews({
        ...dto,
        categoryId: { id: dto.categoryId },
        createdBy: { id: userId },
        updatedBy: { id: userId },
        createdAt: now,
        updatedAt: now,
      });
    } catch (error) {
      return {
        statusCode: 500,
        message: `Failed to create news: ${error instanceof Error ? error.message : error}`,
      };
    }
  }

  @Put(':id')
  async updateNews(
    @Param('id') id: string,
    @Body() dto: UpdateNewsDto,
    @Headers('authorization') token: string,
  ) {
    try {
      const now = new Date();
      const userId = parseInt(token, 10); //change to JWT prase

      return await this.newsService.updateNews(
        {
          id: Number(id),
          title: dto.title,
          image: dto.image,
          detail: dto.detail,
          categoryId: { id: dto.categoryId },
          updatedBy: { id: userId },
          updatedAt: now,
          startDate: dto.startDate,
          dueDate: dto.dueDate,
        }
      );
    } catch (error) {
      return {
        statusCode: 500,
        message: `Failed to update news: ${error instanceof Error ? error.message : error}`,
      };
    }
  }

  @Delete(':id')
  async deleteNews(@Param('id') id: string) {
    try {
      return await this.newsService.deleteNews(Number(id));
    } catch (error) {
      return {
        statusCode: 500,
        message: `Failed to delete news: ${error instanceof Error ? error.message : error}`,
      };
    }
  }
}
