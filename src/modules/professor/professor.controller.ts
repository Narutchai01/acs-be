import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDtoV1 } from './dto/create-professor.dto.v1';
import { success } from 'src/core/interceptors/response.helper';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { AuthenticatedRequest } from 'src/models/auth';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller({
  path: 'professors',
  version: '1',
})
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createProfessor(
    @Body() body: CreateProfessorDtoV1,
    @UploadedFile() image: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    const professor = await this.professorService.createProfessor(
      body,
      image,
      req.user.userId,
    );
    return success(professor, HttpStatus.CREATED);
  }
}
