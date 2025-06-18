import { Body,Controller,Post,UseInterceptors,Get,Param,Patch,Delete } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateNewsDto } from './dto/create-news';
import { UpdateNewsDto } from './dto/update-news';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async createNews(@Body() createNewsDto: CreateNewsDto) {
    try {
      return await this.newsService.createNews(createNewsDto);
    } catch (error) {
      return {
        statusCode: 500,
        message: `Failed to create news: ${error instanceof Error ? error.message : error}`,
      };
    }
  }

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

  @Patch()
  async updateNews(@Body() updateNewsDto: UpdateNewsDto) {
    try {
      return await this.newsService.updateNews(updateNewsDto);
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
