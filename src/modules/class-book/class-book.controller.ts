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
  Patch,
} from '@nestjs/common';
import { ClassBookService } from './class-book.service';
import { RequestClassBookDtoV1 } from './dto/create-class-book.dto.v1';
import { AuthenticatedRequest } from 'src/models/auth';
import { FileInterceptor } from '@nestjs/platform-express';
import { success } from 'src/core/interceptors/response.helper';
import { ClassBookFactory } from './class-book.factory';
import { QueryClassBookDto } from './dto/v1/get-class-book.dto';
import { JwtCommonAuthGuard } from '../auth/jwt-common.guard';
import { ClassBookDtoV1 } from './dto/class-book.dto.v1';
import { UpdateClassBookDtoV1 } from './dto/update-class-book.dto.v1';

@Controller({
  path: 'class-book',
  version: '1',
})
export class ClassBookController {
  constructor(
    private readonly classBookService: ClassBookService,
    private readonly classFactory: ClassBookFactory,
  ) { }
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

  @UseGuards(JwtCommonAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateClassBook(
    @Param('id') id: number,
    @Body() body: UpdateClassBookDtoV1,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    const classBoookId = Number(id);
    const result = await this.classBookService.updateClassBook(
      classBoookId,
      body,
      req.user.userId,
      file,
    );
    const dto = this.classFactory.mapClassBookModelToClassBookDto(result);
    return success<ClassBookDtoV1>(dto, HttpStatus.OK);
  }
}
