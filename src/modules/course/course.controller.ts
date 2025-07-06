import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../../models/auth';
import { CourseFactory } from './course.factory';
import { QueryCourseDto } from './dto/get-course.dto';
import { success } from 'src/core/interceptors/response.helper';

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
  ) {
    const result = await this.courseService.createCourse(body, req.user.userId);
    const dto = this.courseFactory.mapCourseModelToCourseDto(result);
    return {
      statusCode: 201,
      data: dto,
    };
  }

  @Get(':id')
  async getCourseById(@Param('id', ParseIntPipe) id: number) {
    try {
      const course = await this.courseService.getCourseById(id);

      const dto = this.courseFactory.mapCourseModelToCourseDto(course);

      return success(dto, HttpStatus.OK);
    } catch (error) {
      console.error('Error fetching course by ID:', error);

      if (
        error instanceof Error &&
        error.message.toLowerCase().includes('not found')
      ) {
        throw new HttpException(
          { message: error.message },
          HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(
        { message: 'Internal server error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCourseDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const IdNumber = Number(id);
    const result = await this.courseService.updateCourse(
      IdNumber,
      body,
      req.user.userId,
    );
    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
  @Get()
  async getCourse(@Query() query: QueryCourseDto) {
    try {
      const { page, pageSize } = query;
      if (!page || !pageSize) {
        throw new HttpException(
          { message: 'Page and pageSize are required' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const { rows, ...data } = await this.courseService.getCourse(query);
      const dtos = this.courseFactory.mapCourseModelsToCourseDtos(rows);
      const dataPagination = {
        ...data,
        rows: dtos,
      };
      return success(dataPagination, HttpStatus.OK);
    } catch (error) {
      console.error('Error fetching courses:', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        { message: 'Internal server error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCourse(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthenticatedRequest,
  ) {
    const result = await this.courseService.deleteCourse(id, req.user.userId);
    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}
