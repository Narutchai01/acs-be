import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Res,
  Patch,
  Param,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { Response } from 'express';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../../models/auth';
import { CourseFactory } from './course.factory';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private courseFactory: CourseFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCourse(
    @Body() body: CreateCourseDto,
    @Request() req: AuthenticatedRequest,
    @Res() res: Response,
  ) {
    const result = await this.courseService.createCourse(body, req.user.userId);
    const dto = this.courseFactory.mapCourseModelToCourseDto(result);
    return res.status(201).json(dto);
  }
  @Get(':id')
  async getCourseById(@Res() res: Response, @Param('id') id: number) {
    const course = await this.courseService.getCourseById(id);
    const dto = this.courseFactory.mapCourseModelToCourseDto(course);
    return res.status(200).json(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCourseDto,
    @Request() req: AuthenticatedRequest,
    @Res() res: Response,
  ) {
    const IdNumber = Number(id);
    const result = await this.courseService.updateCourse(
      IdNumber,
      body,
      req.user.userId,
    );
    return res.status(200).json(result);
  }

  @Get()
  async getCourse(@Res() res: Response) {
    const courses = await this.courseService.getCourse();
    const dtos = this.courseFactory.mapCourseModelsToCourseDtos(courses);
    return res.status(200).json(dtos);
  }
}
