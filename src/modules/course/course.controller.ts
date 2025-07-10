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
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../../models/auth';
import { QueryCourseDto } from './dto/get-course.dto';
import { CourseFactory } from './course.factory';
import { UpdateCourseDto } from './dto/update-course.dto';

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
    // const dto = this.courseFactory.mapCourseModelToCourseDto(result);
    return {
      statusCode: 201,
      data: result,
    };
  }

  @Get()
  async getCourseList(@Query() query: QueryCourseDto) {
    const { page, pageSize } = query;
    const { rows, totalRecords } = await this.courseService.getList(query);
    const dto = this.courseFactory.mapCourseModelsToCourseDtos(rows);

    const data = { page, totalRecords, pageSize, dto };
    return {
      statusCode: 200,
      data: data,
    };
  }

  @Get(':id')
  async getCourseById(@Param('id') id: number) {
    const course = await this.courseService.getById(id);
    const dto = this.courseFactory.mapCourseModelToCourseDto(course);
    return {
      statusCode: 200,
      data: dto,
    };
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
    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}
