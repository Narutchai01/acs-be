import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ITypeCourseRepository } from './typecourse.abstract';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { TypeCourseFactory } from './typecourse.facoty';
import { TypeCourseModel } from 'src/models/course';

@Injectable()
export class TypeCourseRepository implements ITypeCourseRepository {
  constructor(
    private prisma: PrismaService,
    private TypeCourseFactory: TypeCourseFactory,
  ) {}
  getTypeCourses(): Promise<TypeCourseModel[]> {
    throw new Error('Method not implemented.');
  }
  async getTypeCourse(): Promise<TypeCourseModel[]> {
    const typecourse = await this.prisma.typeCourse.findMany({
      include: {
        Course: false,
      },
    });

    if (!typecourse) {
      throw new HttpException('Type course not found', HttpStatus.NOT_FOUND);
    }
    return this.TypeCourseFactory.mapTypeCourseEntitiesToTypeCourseModels(
      typecourse,
    );
  }
}
