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
import type { File as MulterFile } from 'multer';

@Controller({
  version: '2',
  path: 'professors',
})
export class ProfessorControllerV2 {
  constructor(private readonly professorService: ProfessorService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: MulterFile,
    @Body() body: CreateProfessorDtoV1,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.professorService.createProfessorV2(
      body,
      req.user.userId,
      file,
    );
  }
}
