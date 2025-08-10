import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProfessor(@Body() body: CreateProfessorDto) {
    const result = await this.professorService.createProfessor(body);

    return result;
  }
}
