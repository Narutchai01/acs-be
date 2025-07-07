import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';

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

  @Get()
  async getCurriculums() {
    return this.curriculumService.getCurriculums();
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
    return this.curriculumService.getCurriculumById(curriculumId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateCurriculum(
    @Param('id') id: string,
    @Body() updateCurriculumDto: UpdateCurriculumDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const curriculumId = parseInt(id, 10);
    if (isNaN(curriculumId)) {
      throw new HttpException(
        'Invalid curriculum ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.curriculumService.updateCurriculum(
      curriculumId,
      updateCurriculumDto,
      req.user.userId,
    );
  }
}
