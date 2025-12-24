import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Body,
  Req,
} from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { CreateProfessorDtoV1 } from './dto/create-professor.dto.v1';
import { AuthenticatedRequest } from 'src/models/auth';
import { ProfessorFactory } from './professor.factory';
import { success } from 'src/core/interceptors/response.helper';
import { ProfessorDtoV1 } from './dto/professor.dto.v1';

@Controller({
  version: '2',
  path: 'professors',
})
export class ProfessorControllerV2 {
  constructor(
    private readonly professorService: ProfessorService,
    private readonly professorFactory: ProfessorFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateProfessorDtoV1,
    @Req() req: AuthenticatedRequest,
  ) {
    const professor = await this.professorService.createProfessorV2(
      body,
      req.user.userId,
      file,
    );
    const dto =
      this.professorFactory.mapProfessorModelToProfessorDto(professor);

    return success<ProfessorDtoV1>(dto, 201);
  }
}
