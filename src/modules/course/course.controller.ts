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
  Delete,
  Query,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { Response } from 'express';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../../models/auth';
import { CourseFactory } from './course.factory';
import { QueryCourseDto } from './dto/get-course.dto';

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
  async getCourse(@Res() res: Response, @Query() query: QueryCourseDto) {
    const { rows, ...data } = await this.courseService.getCourse(query);
    const dtos = this.courseFactory.mapCourseModelsToCourseDtos(rows);
    const dataPagination = {
      ...data,
      rows: dtos,
    };
    return res.status(200).json({
      status: true,
      data: dataPagination,
      error: null,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCourse(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthenticatedRequest,
    @Res() res: Response,
  ) {
    const result = await this.courseService.deleteCourse(id, req.user.userId);
    return res.status(200).json(result);
  }
}
