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
} from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDtoV1 } from './dto/create-professor.dto.v1';
import { success } from 'src/core/interceptors/response.helper';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { AuthenticatedRequest } from 'src/models/auth';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProfessorFactory } from './professor.factory';
import { ProfessorDtoV1 } from './dto/professor.dto.v1';
import type { File as MulterFile } from 'multer';

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
    @UploadedFile() image: MulterFile,
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
}
