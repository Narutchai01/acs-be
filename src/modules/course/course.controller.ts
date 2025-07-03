import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Patch, 
  Param,
} from '@nestjs/common';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CourseModel } from 'src/models/course';

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    userId: number;
    roleId: number;
  };
}

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCourse(
    @Body() body: CreateCourseDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const result = await this.courseService.createCourse(body, req.user.userId);

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateCourse(
    @Param('id') id: string,
    @Body() body: CreateCourseDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const IdNumber = Number(id);
    const result = await this.courseService.updateCourse(
      IdNumber,
      body,
      req.user.userId,
    );

    return result;
    }
    
  @Get()
  async getCourse(): Promise<CourseModel[]> {
    return await this.courseService.getCourse();
  }
}
