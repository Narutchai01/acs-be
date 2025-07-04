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
} from '@nestjs/common';
import { NewsService } from './news.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateNewsDto } from './dto/creat-news.dto';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';
import { NewsFactory } from './news.factory';
import { QueryNewsDto } from './dto/get-news.dto';

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    userId: number;
    roleId: number;
  };
}

@Controller('news')
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
  async getNews(@Res() res: Response, @Query() quey: QueryNewsDto) {
    const news = await this.newsService.getNews(quey);
    const dtos = this.newsFactory.mapNewsModelsToNewsDtos(news);
    return res.json({
      status: true,
      data: dtos,
      error: null,
    });
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
    @Body() body: CreateNewsDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const IdNumber = Number(id);
    const result = await this.newsService.updateNews(
      IdNumber,
      body,
      file,
      req.user.userId,
    );

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteNews(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    const IdNumber = Number(id);
    const result = await this.newsService.deleteNews(IdNumber, req.user.userId);
    return result;
  }
}
