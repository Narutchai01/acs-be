import { Injectable } from '@nestjs/common';
import { ClassBookModel, RequestClassBookModel, UpdateClassBookModel } from 'src/models/class-book';
import { QueryClassBookDto } from 'src/modules/class-book/dto/v1/get-class-book.dto';

@Injectable()
export abstract class IClassBookRepository {
  abstract createClassBook(
    data: RequestClassBookModel,
    createdBy: number,
  ): Promise<ClassBookModel>;
  abstract getClassBooks(query: QueryClassBookDto): Promise<ClassBookModel[]>;
  abstract getClassBookById(id: number): Promise<ClassBookModel>;
  abstract count(): Promise<number>;
  abstract updateClassBook(
    id: number,
    data: UpdateClassBookModel,
  ): Promise<ClassBookModel>;
}
