import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Res,
  Param,
} from '@nestjs/common';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Request as ExpressRequest, Response } from 'express';
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
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCourse(
    @Body() body: CreateCourseDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const result = await this.courseService.createCourse(body, req.user.userId);

    return result;
  }

  @Get(':id')
  async getCourseById(@Res() res: Response, @Param('id') id: number) {
    const course = await this.courseService.getCourseById(id);
    res.json(course);
  }
  
  @Get()
  async getCourse(): Promise<CourseModel[]> {
    return await this.courseService.getCourse();
  }
}
