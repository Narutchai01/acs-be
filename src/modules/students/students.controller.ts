import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  Req,
  Get,
  HttpStatus,
  Param,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/v1/create-student.dto';
import { JwtCommonAuthGuard } from '../auth/jwt-common.guard';
import { AuthenticatedRequest } from 'src/models/auth';
import { QueryStudentsDto } from './dto/v1/get-student.dto';
import { StudentFactory } from './students.factory';
import { success } from 'src/core/interceptors/response.helper';
import { UpdateStudentDto } from './dto/v1/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller({
  path: 'students',
  version: '1',
})
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private studentFactory: StudentFactory,
  ) {}

  @UseGuards(JwtCommonAuthGuard)
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

  @Get(':id')
  async getStudentById(@Param('id') id: number) {
    const studentModel = await this.studentsService.getStudentById(id);
    const dto = this.studentFactory.mapStudentModelToStudentDto(studentModel);
    return success(dto, HttpStatus.OK);
  }

  @UseGuards(JwtCommonAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  async updateStudent(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    const student = await this.studentsService.updateStudent(
      id,
      updateStudentDto,
      file,
      req.user.userId,
    );
    const dto = this.studentFactory.mapStudentModelToStudentDto(student);
    return success(dto, HttpStatus.OK);
  }
}
