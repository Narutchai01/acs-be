import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurriculumService } from './curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { AuthenticatedRequest } from 'src/models/auth';
import { CurriculumFactory } from './curriculum.factory';
import { success } from 'src/core/interceptors/response.helper';
import { CurriculumDto } from './dto/curriculum.dto';
import { Pageable } from 'src/models';

@Controller('curriculum')
export class CurriculumController {
  constructor(
    private readonly curriculumService: CurriculumService,
    private readonly curriculumFactory: CurriculumFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createCurriculum(
    @Body() createCurriculumDto: CreateCurriculumDto,
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new HttpException('Image file is required', HttpStatus.BAD_REQUEST);
    }

    const data = await this.curriculumService.createCurriculum(
      createCurriculumDto,
      req.user.userId,
      file,
    );

    const dto = this.curriculumFactory.mapCurriculumModelToCurriculumDto(data);
    return success<CurriculumDto>(dto, HttpStatus.CREATED);
  }

  @Get()
  async getCurriculums() {
    const { rows, ...data } = await this.curriculumService.getCurriculums();
    const dtos =
      this.curriculumFactory.mapCurriculumModelsToCurriculumDtos(rows);

    const result = {
      ...data,
      rows: dtos,
    };
    return success<Pageable<CurriculumDto>>(result, HttpStatus.OK);
  }

  @Get(':id')
  async getCurriculumById(@Param('id') id: string) {
    const curriculumId = parseInt(id, 10);
    if (isNaN(curriculumId)) {
      throw new HttpException(
        'Invalid curriculum ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = await this.curriculumService.getCurriculumById(curriculumId);
    if (!data) {
      throw new HttpException('Curriculum not found', HttpStatus.NOT_FOUND);
    }
    const dto = this.curriculumFactory.mapCurriculumModelToCurriculumDto(data);
    return success<CurriculumDto>(dto, HttpStatus.OK);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateCurriculum(
    @Param('id') id: string,
    @Body() updateCurriculumDto: UpdateCurriculumDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    const curriculumId = parseInt(id, 10);
    if (isNaN(curriculumId)) {
      throw new HttpException(
        'Invalid curriculum ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = await this.curriculumService.updateCurriculum(
      curriculumId,
      updateCurriculumDto,
      req.user.userId,
      file,
    );
    if (!data) {
      throw new HttpException('Curriculum not found', HttpStatus.NOT_FOUND);
    }
    const dto = this.curriculumFactory.mapCurriculumModelToCurriculumDto(data);
    return success<CurriculumDto>(dto, HttpStatus.OK);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCurriculum(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const curriculumId = parseInt(id, 10);
    if (isNaN(curriculumId)) {
      throw new HttpException(
        'Invalid curriculum ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.curriculumService.deleteCurriculum(
      curriculumId,
      req.user.userId,
    );
    if (!result) {
      throw new HttpException('Curriculum not found', HttpStatus.NOT_FOUND);
    }
    const dto =
      this.curriculumFactory.mapCurriculumModelToCurriculumDto(result);
    return success<CurriculumDto>(dto, HttpStatus.OK);
  }
}
