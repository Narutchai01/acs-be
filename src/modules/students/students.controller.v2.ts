import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  Req,
  HttpStatus,
  Param,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/v1/create-student.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/models/auth';
import { StudentFactory } from './students.factory';
import { success } from 'src/core/interceptors/response.helper';
import { UpdateStudentDto } from './dto/v1/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtCommonAuthGuard } from '../auth/jwt-common.guard';

@Controller({
  path: 'students',
  version: '2',
})
export class StudentsControllerV2 {
  constructor(
    private readonly studentsService: StudentsService,
    private studentFactory: StudentFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createStudent(
    @Body() createStudentDto: CreateStudentDto[],
    @Req() req: AuthenticatedRequest,
    @Query('classBookId') classBookId: number,
  ) {
    return this.studentsService.createStudents(
      createStudentDto,
      req.user.userId,
      classBookId,
    );
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
