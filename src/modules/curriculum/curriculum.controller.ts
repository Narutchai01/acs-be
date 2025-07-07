import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    userId: number;
    roleId: number;
  };
}

@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCurriculum(
    @Body() createCurriculumDto: CreateCurriculumDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.curriculumService.createCurriculum(
      createCurriculumDto,
      req.user.userId,
    );
  }
}
