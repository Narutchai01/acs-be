import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  Req,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/v1/create-student.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/models/auth';
import { QueryStudentsDto } from './dto/v1/get-student.dto';
import { StudentFactory } from './students.factory';
import { success } from 'src/core/interceptors/response.helper';

@Controller({
  path: 'students',
  version: '1',
})
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private studentFactory: StudentFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createStudent(
    @Body() createStudentDto: CreateStudentDto,
    @Req() req: AuthenticatedRequest,
    @Query('classBookId') classBookId: number,
  ) {
    return this.studentsService.createStudent(
      createStudentDto,
      req.user.userId,
      classBookId,
    );
  }

  @Get()
  async getStudents(@Query() query: QueryStudentsDto) {
    const studentsModel = await this.studentsService.getStudents(query);
    const dto = this.studentFactory.mapStudentModelsToStudentDtos(
      studentsModel.rows,
    );

    const response = { ...studentsModel, rows: dto };
    return success(response, HttpStatus.OK);
  }

  @Get('by-user')
  async getStudentByUserId(@Query('userId') userId: number) {
    const studentModel = await this.studentsService.getStudentByUserId(userId);
    const dto = this.studentFactory.mapStudentModelToStudentDto(studentModel);
    return success(dto, HttpStatus.OK);
  }
}
