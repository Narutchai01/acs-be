import {
  Body,
  Controller,
  Request,
  UseGuards,
  Param,
  Patch,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProfessorService } from './professor.service';
import { ProfessorFactory } from './professor.factory';
import { UpdateProfessorDto } from './dto/update-professor.dto';

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    userId: number;
    roleId: number;
  };
}

@Controller('professor')
export class ProfessorController {
  constructor(
    private readonly ProfessorService: ProfessorService,
    private readonly ProfessorFactory: ProfessorFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateProfessor(
    @Param('id') id: string,
    @Body() body: UpdateProfessorDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const IdNumber = Number(id);
    const result = await this.ProfessorService.updateProfessor(
      IdNumber,
      body,
      req.user.userId,
    );

    return result;
  }
}
