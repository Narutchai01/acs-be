import { Controller, Post, Body } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  async createProfessor(@Body() body: CreateProfessorDto) {
    return this.professorService.createProfessor(body);
  }
}
