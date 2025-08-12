import {
  Body,
  Controller,
  Request,
  UseGuards,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthenticatedRequest } from 'src/models/auth';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProfessorService } from './professor.service';
import { ProfessorFactory } from './professor.factory';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { UsersService } from '../users/users.service';

@Controller('professor')
export class ProfessorController {
  constructor(
    private readonly ProfessorService: ProfessorService,
    private readonly UserService: UsersService,
    private readonly ProfessorFactory: ProfessorFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateProfessor(
    @Param('id') id: string,
    @Body() body: UpdateProfessorDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const ProfessorIdNumber = Number(id);
    const UserIdNumber = Number(body.userId);

    const professorBody = {
      userId: body.userId,
      academicPosition: body.academicPosition,
      majorPosition: body.majorPosition,
      profRoom: body.profRoom,
      fieldOffexpertise: body.fieldOffexpertise,
    };

    const userBody = {
      firstNameTh: body.firstNameTh,
      lastNameTh: body.lastNameTh,
      firstNameEn: body.firstNameEn,
      lastNameEn: body.lastNameEn,
    };

    const result = await this.ProfessorService.updateProfessor(
      ProfessorIdNumber,
      professorBody,
      req.user.userId,
    );

    const result = await this.UserService.updateUser(
      UserIdNumber,
      UserBody,
      req.user.userId,
    );

    return result;
  }
}
