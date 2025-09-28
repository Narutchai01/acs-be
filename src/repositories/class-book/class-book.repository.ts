import { HttpException, Injectable } from '@nestjs/common';
import { IClassBookRepository } from './class-book.abstract';
import { ClassBookModel, RequestClassBookModel } from 'src/models/class-book';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { ClassBookFactory } from './class-book.factory';

@Injectable()
export class ClassBookRepository implements IClassBookRepository {
  constructor(
    private prisma: PrismaService,
    private classBookFactory: ClassBookFactory,
  ) {}

  async createClassBook(
    data: RequestClassBookModel,
    createdBy: number,
  ): Promise<ClassBookModel> {
    const classBook = await this.prisma.classBook.create({
      data: {
        ...data,
        firstYearAcademic: data.firstYearAcademic.toString(),
        createdBy,
        updatedBy: createdBy,
      },
      include: { Student: false },
    });
    return this.classBookFactory.mapEntityToModel(classBook);
  }

  async getClassBooks(): Promise<ClassBookModel[]> {
    const classBooks = await this.prisma.classBook.findMany({
      where: { deletedAt: null },
      include: { Student: true },
      orderBy: { classof: 'desc' },
      take: 2,
    });
    return this.classBookFactory.mapEntitiesToModels(classBooks);
  }

  async getClassBookById(id: number): Promise<ClassBookModel> {
    const classBook = await this.prisma.classBook.findUnique({
      where: { id, deletedAt: null },
      include: { Student: false },
    });
    if (!classBook) {
      throw new HttpException(`ClassBook with id ${id} not found`, 404);
    }
    return this.classBookFactory.mapEntityToModel(classBook);
  }
}
