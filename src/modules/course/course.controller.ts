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
    return res.status(201).json({
      status: true,
      data: dto,
      error: null,
    });
  }

  @Get(':id')
  async getCourseById(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const course = await this.courseService.getCourseById(id);

      const dto = this.courseFactory.mapCourseModelToCourseDto(course);
      return res.status(200).json({
        status: true,
        data: dto,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching course by ID:', error);
      if (error instanceof Error && error.message.includes('not found')) {
        return res.status(404).json({
          status: false,
          data: null,
          error: error.message,
        });
      }
      return res.status(500).json({
        status: false,
        data: null,
        error: error instanceof Error ? error.message : 'Server internal error',
      });
    }
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
    try {
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
    } catch (error) {
      console.error('Error fetching courses:', error);
      return res.status(500).json({
        status: false,
        data: null,
        error: error instanceof Error ? error.message : 'Server internal error',
      });
    }
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
