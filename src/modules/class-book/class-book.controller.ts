import {
  Controller,
  HttpStatus,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClassBookService } from './class-book.service';
import { Post, Body, UploadedFile } from '@nestjs/common';
import { RequestClassBookDtoV1 } from './dto/create-class-book.dto.v1';
import type { File as MulterFile } from 'multer';
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
    @UploadedFile() file: MulterFile,
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
}
