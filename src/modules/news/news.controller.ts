import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Query,
  Param,
  Patch,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateNewsDto, CreateNewsMediaDto } from './dto/creat-news.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';
import { NewsFactory } from './news.factory';
import { QueryNewsDto } from './dto/get-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { QueryNewsMediaDto } from './dto/get-newsmedia.dto';
import { success } from 'src/core/interceptors/response.helper';
import { NewsMediaDto } from './dto/newsmedia.dto';
import { NewsDto } from './dto/news.dto';
import { Pageable } from 'src/models';
import { AuthenticatedRequest } from 'src/models/auth';
import type { File as MulterFile } from 'multer';

@Controller({
  path: 'news',
  version: '1',
})
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly newsFactory: NewsFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createNews(
    @UploadedFile() file: MulterFile,
    @Body() body: CreateNewsDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const result = await this.newsService.createNews(
      body,
      file,
      req.user.userId,
    );

    const dto = this.newsFactory.mapNewsModelToNewsDto(result);
    return success<NewsDto>(dto, HttpStatus.CREATED);
  }

  @Get()
  async getNews(@Query() quey: QueryNewsDto) {
    const news = await this.newsService.getNews(quey);
    const dto = news.rows.map((item) =>
      this.newsFactory.mapNewsModelToNewsDto(item),
    );

    const data = {
      rows: dto,
      totalRecords: news.totalRecords,
      page: news.page,
      pageSize: news.pageSize,
    };

    return success<Pageable<NewsDto>>(data, HttpStatus.OK);
  }

  @UseGuards(JwtAuthGuard)
  @Post('news-media/:type')
  @UseInterceptors(FileInterceptor('image'))
  async createNewsMedia(
    @UploadedFile() file: MulterFile,
    @Body() body: CreateNewsMediaDto,
    @Request() req: AuthenticatedRequest,
    @Param('type') type: string,
  ) {
    const result = await this.newsService.createNewsMedia(
      body,
      file,
      req.user.userId,
      type,
    );

    const dto = this.newsFactory.mapNewsMediaModelToNewsMediaDto(result);
    return success<NewsMediaDto>(dto, HttpStatus.CREATED);
  }

  @Get('news-media')
  async getNewsMedia(@Query() query: QueryNewsMediaDto) {
    const newsmedia = await this.newsService.getNewsMedia(query);
    const dto = newsmedia.map((item) =>
      this.newsFactory.mapNewsMediaModelToNewsMediaDto(item),
    );
    return success<NewsMediaDto[]>(dto, HttpStatus.OK);
  }

  @Get(':id')
  async getNewsById(@Param('id') id: string) {
    const IdNumber = Number(id);
    const news = await this.newsService.getNewsById(IdNumber);
    const dto = this.newsFactory.mapNewsModelToNewsDto(news);
    return success<NewsDto>(dto, HttpStatus.OK);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateNews(
    @Param('id') id: string,
    @UploadedFile() file: MulterFile,
    @Body() body: UpdateNewsDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const IdNumber = Number(id);
    const result = await this.newsService.updateNews(
      IdNumber,
      body,
      file,
      req.user.userId,
    );

    return success<NewsDto>(result, HttpStatus.OK);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteNews(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    const IdNumber = Number(id);
    const result = await this.newsService.deleteNews(IdNumber, req.user.userId);
    return success<NewsDto>(result, HttpStatus.OK);
  }
}
