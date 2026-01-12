import { Injectable } from '@nestjs/common';
import { IClassBookRepository } from 'src/repositories/class-book/class-book.abstract';
import { ClassBookModel, RequestClassBookModel } from 'src/models/class-book';
import { RequestClassBookDtoV1 } from './dto/create-class-book.dto.v1';
import { SupabaseService } from 'src/provider/store/supabase/supabase.service';
import { QueryClassBookDto } from './dto/v1/get-class-book.dto';
import { Pageable } from 'src/models';
import { UpdateClassBookDtoV1 } from './dto/update-class-book.dto.v1';

@Injectable()
export class ClassBookService {
  constructor(
    private classBookRepository: IClassBookRepository,
    private supabaseService: SupabaseService,
  ) { }
  async createClassBook(
    data: RequestClassBookDtoV1,
    createdBy: number,
    file: Express.Multer.File,
  ): Promise<ClassBookModel> {
    const imageUrl = await this.supabaseService.uploadFile(file, 'classbook');
    const classBookData: RequestClassBookModel = {
      ...data,
      image: imageUrl,
    };
    return this.classBookRepository.createClassBook(classBookData, createdBy);
  }

  async getClassBooks(
    query: QueryClassBookDto,
  ): Promise<Pageable<ClassBookModel>> {
    const [rows, count] = await Promise.all([
      this.classBookRepository.getClassBooks(query),
      this.classBookRepository.count(),
    ]);

    return {
      rows: rows,
      totalRecords: count,
      page: query.page || 1,
      pageSize: query.pageSize || 10,
    };
  }

  async getClassBookById(id: number): Promise<ClassBookModel> {
    return this.classBookRepository.getClassBookById(id);
  }

  async updateClassBook(
    id: number,
    body: UpdateClassBookDtoV1,
    updatedBy: number,
    file?: Express.Multer.File,
  ): Promise<ClassBookModel> {
    const image = file
      ? await this.supabaseService.uploadFile(file, 'classBook')
      : '';

    const updateData = {
      classof: Number(body.classof),
      firstYearAcademic: body.firstYearAcademic,
      curriculumId: Number(body.curriculumId),
      image,
      updatedBy: updatedBy,
    };

    return this.classBookRepository.updateClassBook(id, updateData);
  }

  async deleteClassBook( id: number, updatedBy: number ): Promise<ClassBookModel> {
    return this.classBookRepository.deleteClassBook(id, updatedBy);
  }


}
