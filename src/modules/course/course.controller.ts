import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Query,
  UseGuards,
  Param,
  Patch,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../../models/auth';
import { QueryCourseDto } from './dto/get-course.dto';
import { CourseFactory } from './course.factory';
import { UpdateCourseDto } from './dto/update-course.dto';
import { success } from 'src/core/interceptors/response.helper';
import { CourseDto } from './dto/course.dto';
import { Pageable } from 'src/models';

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
    return success<CourseDto>(dto, HttpStatus.CREATED);
  }

  @Get()
  async getCourseList(@Query() query: QueryCourseDto) {
    const { page, pageSize } = query;
    const { rows, totalRecords } = await this.courseService.getList(query);
    const dto = this.courseFactory.mapCourseModelsToCourseDtos(rows);

    const data = { page, totalRecords, pageSize, rows: dto };
    return success<Pageable<CourseDto>>(data, HttpStatus.OK);
    // return success(query, HttpStatus.OK);
  }

  @Get(':id')
  async getCourseById(@Param('id') id: number) {
    const course = await this.courseService.getById(id);
    const dto = this.courseFactory.mapCourseModelToCourseDto(course);
    return success<CourseDto>(dto, HttpStatus.OK);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateCourse(
    @Param('id') id: number,
    @Body() body: UpdateCourseDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const IdNumber = Number(id);
    const result = await this.courseService.updateCourse(
      body,
      IdNumber,
      req.user.userId,
    );
    const dto = this.courseFactory.mapCourseModelToCourseDto(result);
    return success<CourseDto>(dto, HttpStatus.OK);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCourse(
    @Param('id') id: number,
    @Request() req: AuthenticatedRequest,
  ) {
    const result = await this.courseService.deleteCoruse(id, req.user.userId);
    const dto = this.courseFactory.mapCourseModelToCourseDto(result);
    return success<CourseDto>(dto, HttpStatus.OK);
  }
}
