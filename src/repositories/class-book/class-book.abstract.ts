import { Injectable } from '@nestjs/common';
import { ClassBookModel, RequestClassBookModel } from 'src/models/class-book';

@Injectable()
export abstract class IClassBookRepository {
  abstract createClassBook(
    data: RequestClassBookModel,
    createdBy: number,
  ): Promise<ClassBookModel>;
  abstract getClassBooks(): Promise<ClassBookModel[]>;
}
