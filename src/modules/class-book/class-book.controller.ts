import {
  Controller,
  Get,
  HttpStatus,
  Req,
  UseGuards,
  Query,
  UseInterceptors,
  Param,
  Post,
  Body,
  UploadedFile,
} from '@nestjs/common';
import { ClassBookService } from './class-book.service';
import { RequestClassBookDtoV1 } from './dto/create-class-book.dto.v1';
import { AuthenticatedRequest } from 'src/models/auth';
import { FileInterceptor } from '@nestjs/platform-express';
import { success } from 'src/core/interceptors/response.helper';
import { ClassBookFactory } from './class-book.factory';
import { QueryClassBookDto } from './dto/v1/get-class-book.dto';
import { JwtCommonAuthGuard } from '../auth/jwt-common.guard';

@Controller({
  path: 'class-book',
  version: '1',
})
export class ClassBookController {
  constructor(
    private readonly classBookService: ClassBookService,
    private readonly classFactory: ClassBookFactory,
  ) {}
  @UseGuards(JwtCommonAuthGuard)
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
  async getClassBooks(@Query() query: QueryClassBookDto) {
    const { rows, totalRecords, page, pageSize } =
      await this.classBookService.getClassBooks(query);
    const classBookDtos =
      this.classFactory.mapClassBookModelsToClassBookDtos(rows);

    return success(
      { rows: classBookDtos, totalRecords, page, pageSize },
      HttpStatus.OK,
    );
  }

  @Get(':id')
  async getClassBookById(@Param('id') id: number) {
    const classBook = await this.classBookService.getClassBookById(+id);
    const classBookDto =
      this.classFactory.mapClassBookModelToClassBookDto(classBook);
    return success(classBookDto, HttpStatus.OK);
  }
}
