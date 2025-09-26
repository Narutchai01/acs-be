import { Injectable } from '@nestjs/common';
import { IClassBookRepository } from 'src/repositories/class-book/class-book.abstract';
import { ClassBookModel, RequestClassBookModel } from 'src/models/class-book';
import { RequestClassBookDtoV1 } from './dto/create-class-book.dto.v1';
import type { File as MulterFile } from 'multer';
import { SupabaseService } from 'src/provider/store/supabase/supabase.service';

@Injectable()
export class ClassBookService {
  constructor(
    private classBookRepository: IClassBookRepository,
    private supabaseService: SupabaseService,
  ) {}
  async createClassBook(
    data: RequestClassBookDtoV1,
    createdBy: number,
    file: MulterFile,
  ): Promise<ClassBookModel> {
    const imageUrl = await this.supabaseService.uploadFile(file, 'classbook');
    const classBookData: RequestClassBookModel = {
      ...data,
      image: imageUrl,
    };
    return this.classBookRepository.createClassBook(classBookData, createdBy);
  }
}
