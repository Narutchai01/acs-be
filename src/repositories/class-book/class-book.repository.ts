import { HttpException, Injectable } from '@nestjs/common';
import { IClassBookRepository } from './class-book.abstract';
import { ClassBookModel, RequestClassBookModel } from 'src/models/class-book';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { ClassBookFactory } from './class-book.factory';
import { QueryClassBookDto } from 'src/modules/class-book/dto/v1/get-class-book.dto';
import calculatePagination from 'src/core/utils/calculatePagination';

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

  async getClassBooks(query: QueryClassBookDto): Promise<ClassBookModel[]> {
    const {
      page = 1,
      pageSize = 10,
      sortBy = 'classof',
      sortOrder = 'desc',
    } = query;

    const skip = calculatePagination(page, pageSize);

    // Build orderBy object dynamically with proper typing
    const orderBy = sortBy
      ? { [sortBy]: sortOrder }
      : { classof: 'desc' as const };

    const classBooks = await this.prisma.classBook.findMany({
      where: { deletedAt: null },
      include: { Student: true },
      orderBy,
      skip,
      take: pageSize,
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

  async count(): Promise<number> {
    return this.prisma.classBook.count({
      where: { deletedAt: null },
    });
  }
}
