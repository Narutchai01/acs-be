import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Get,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDtoV1 } from './dto/create-professor.dto.v1';
import { success } from 'src/core/interceptors/response.helper';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { AuthenticatedRequest } from 'src/models/auth';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProfessorFactory } from './professor.factory';
import { ProfessorDtoV1 } from './dto/professor.dto.v1';
import { QueryProfessorDto } from './dto/get-professors.dto';
import { Pageable } from 'src/models';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { JwtCommonAuthGuard } from '../auth/jwt-common.guard';

@Controller({
  path: 'professors',
  version: '1',
})
export class ProfessorController {
  constructor(
    private readonly professorService: ProfessorService,
    private readonly professorFactory: ProfessorFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createProfessor(
    @Body() body: CreateProfessorDtoV1,
    @UploadedFile() image: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    const professor = await this.professorService.createProfessorV2(
      body,
      req.user.userId,
      image,
    );
    console.log('created professor success');

    const dto =
      this.professorFactory.mapProfessorModelToProfessorDto(professor);
    return success<ProfessorDtoV1>(dto, HttpStatus.CREATED);
  }

  @Get(':id')
  async getProfessorById(@Param('id') id: string) {
    const IdNumber = Number(id);
    const professor = await this.professorService.getProfessorById(IdNumber);
    const dto =
      this.professorFactory.mapProfessorModelToProfessorDto(professor);
    return success<ProfessorDtoV1>(dto, HttpStatus.OK);
  }

  @Get()
  async getProfessors(@Query() query: QueryProfessorDto) {
    const professors = await this.professorService.getProfessors(query);
    const dto = professors.rows.map((professor) =>
      this.professorFactory.mapProfessorModelToProfessorDto(professor),
    );

    const data = {
      rows: dto,
      totalRecords: professors.totalRecords,
      page: professors.page,
      pageSize: professors.pageSize,
    };

    return success<Pageable<ProfessorDtoV1>>(data, HttpStatus.OK);
  }

  @UseGuards(JwtCommonAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateProfessor(
    @Param('id') id: number,
    @UploadedFile() image: Express.Multer.File,
    @Body() body: UpdateProfessorDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const professor = await this.professorService.updateProfessor(
      id,
      body,
      image,
      req.user.userId,
    );
    const dto =
      this.professorFactory.mapProfessorModelToProfessorDto(professor);
    return success(dto, HttpStatus.OK);
  }
}
