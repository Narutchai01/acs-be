import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Query,
  UseGuards,
  Param,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../../models/auth';
import { QueryCourseDto } from './dto/get-course.dto';
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
    const courses = await this.courseService.getList(query);
    return {
      statusCode: 200,
      data: courses,
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
}
