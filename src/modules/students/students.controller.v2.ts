import { Body, Controller, Post, Query, UseGuards, Req } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/v1/create-student.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/models/auth';

@Controller({
  path: 'students',
  version: '2',
})
export class StudentsControllerV2 {
  constructor(private readonly studentsService: StudentsService) {}

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
}
