import {
  Body,
  Controller,
  Get,
  Post,
  Res,
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
import { Request as ExpressRequest } from 'express';
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

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    userId: number;
    roleId: number;
  };
}

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
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateNewsDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const result = await this.newsService.createNews(
      body,
      file,
      req.user.userId,
    );

    return result;
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
  @Post('news-media')
  @UseInterceptors(FileInterceptor('image'))
  async createNewsMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateNewsMediaDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const result = await this.newsService.createNewsMedia(
      body,
      file,
      req.user.userId,
    );
    return success<NewsMediaDto>(result, HttpStatus.CREATED);
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
  async getNewsById(@Res() res: Response, @Param('id') id: string) {
    const IdNumber = Number(id);
    const news = await this.newsService.getNewsById(IdNumber);
    const dto = this.newsFactory.mapNewsModelToNewsDto(news);
    return res.json({
      status: true,
      data: dto,
      error: null,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateNews(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
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
