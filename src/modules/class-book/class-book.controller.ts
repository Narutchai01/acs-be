import {
  Controller,
  Get,
  HttpStatus,
  Req,
  UseGuards,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { ClassBookService } from './class-book.service';
import { Post, Body, UploadedFile } from '@nestjs/common';
import { RequestClassBookDtoV1 } from './dto/create-class-book.dto.v1';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/models/auth';
import { FileInterceptor } from '@nestjs/platform-express';
import { success } from 'src/core/interceptors/response.helper';
import { ClassBookFactory } from './class-book.factory';

@Controller({
  path: 'class-book',
  version: '1',
})
export class ClassBookController {
  constructor(
    private readonly classBookService: ClassBookService,
    private readonly classFactory: ClassBookFactory,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createClassBook(
    @Body() data: RequestClassBookDtoV1,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    const classBook = await this.classBookService.createClassBook(
      data,
      req.user.userId,
      file,
    );

    const classBookDto =
      this.classFactory.mapClassBookModelToClassBookDto(classBook);

    return success(classBookDto, HttpStatus.CREATED);
  }

  @Get()
  async getClassBooks() {
    const classBooks = await this.classBookService.getClassBooks();
    const classBookDtos =
      this.classFactory.mapClassBookModelsToClassBookDtos(classBooks);
    return success(classBookDtos, HttpStatus.OK);
  }

  @Get(':id')
  async getClassBookById(@Param('id') id: number) {
    const classBook = await this.classBookService.getClassBookById(+id);
    const classBookDto =
      this.classFactory.mapClassBookModelToClassBookDto(classBook);
    return success(classBookDto, HttpStatus.OK);
  }
}
