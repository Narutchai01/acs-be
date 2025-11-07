import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IStudentRepository } from './student.abstract';
import {
  RequestStudentModel,
  StudentModel,
  UpdateStudentModel,
} from 'src/models/student';
import { StudentFactory } from './student.factory';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { QueryStudentsDto } from 'src/modules/students/dto/v1/get-student.dto';
import calculatePagination from 'src/core/utils/calculatePagination';

@Injectable()
export class StudentRepository implements IStudentRepository {
  constructor(
    private studentFactory: StudentFactory,
    private prisma: PrismaService,
  ) {}

  async create(student: RequestStudentModel): Promise<StudentModel> {
    const entity = await this.prisma.student.create({
      data: student,
      include: { user: true, classBook: true },
    });
    return this.studentFactory.mapStudentEntityToStudentModel(entity);
  }

  async getList(query: QueryStudentsDto): Promise<StudentModel[]> {
    const { page, pageSize, classBookId, search, sortBy, sortOrder } = query;

    const entities = await this.prisma.student.findMany({
      skip: calculatePagination(page, pageSize),
      take: pageSize,
      where: {
        deletedAt: null,
        classBookId,
        ...(search && {
          OR: [
            { studentId: { contains: search, mode: 'insensitive' } },
            {
              user: { firstNameTh: { contains: search, mode: 'insensitive' } },
            },
            { user: { lastNameTh: { contains: search, mode: 'insensitive' } } },
          ],
        }),
      },
      include: { user: true, classBook: true },
      orderBy: {
        [sortBy || 'studentId']: sortOrder || 'asc',
      },
    });

    return this.studentFactory.mapStudentEntityToStudentModels(entities);
  }

  async count(query: QueryStudentsDto): Promise<number> {
    const { classBookId } = query;
    return this.prisma.student.count({
      where: { deletedAt: null, classBookId },
    });
  }

  async getByUserId(userId: number): Promise<StudentModel> {
    const entity = await this.prisma.student.findFirst({
      where: { userId, deletedAt: null },
      include: { user: true, classBook: true },
    });

    if (!entity) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    return this.studentFactory.mapStudentEntityToStudentModel(entity);
  }

  async getById(id: number): Promise<StudentModel> {
    const student = await this.prisma.student.findUnique({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        user: true,
        classBook: true,
      },
    });

    if (!student) {
      throw new HttpException(`Student ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return this.studentFactory.mapStudentEntityToStudentModel(student);
  }

  async update(id: number, student: UpdateStudentModel): Promise<StudentModel> {
    const entity = await this.prisma.student.update({
      where: { id },
      data: student,
      include: { user: true, classBook: true },
    });
    return this.studentFactory.mapStudentEntityToStudentModel(entity);
  }
}
