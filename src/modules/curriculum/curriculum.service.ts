import { Injectable, Post } from '@nestjs/common';
import { ICurriculumRepository } from 'src/repositories/curriculum/curriculum.abstract';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { CurriculumModel } from 'src/models/curriculum';
import { Pageable } from 'src/models';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { SupabaseService } from 'src/provider/store/supabase/supabase.service';
import { QueryCurriculumDto } from './dto/v1/get-curriculum.dto';

@Injectable()
export class CurriculumService {
  constructor(
    private curriculumRepository: ICurriculumRepository,
    private storage: SupabaseService,
  ) {}
  @Post()
  async createCurriculum(
    curriculumData: CreateCurriculumDto,
    createdBy: number,
    file: Express.Multer.File,
  ): Promise<CurriculumModel> {
    const imageUrl = await this.storage.uploadFile(file, 'curriculum');
    const newsData = {
      year: curriculumData.year,
      fileUrl: curriculumData.fileUrl,
      description: curriculumData.description,
      createdBy,
      updatedBy: createdBy,
      imageUrl: imageUrl,
    };
    return this.curriculumRepository.create(newsData);
  }

  async getCurriculums(
    query: QueryCurriculumDto,
  ): Promise<Pageable<CurriculumModel>> {
    const [rows, count] = await Promise.all([
      this.curriculumRepository.getList(query),
      this.curriculumRepository.count(),
    ]);
    return {
      page: query.page || 1,
      pageSize: query.pageSize || 10,
      totalRecords: count,
      rows: rows,
    };
  }

  async getCurriculumById(id: number): Promise<CurriculumModel> {
    return this.curriculumRepository.getById(id);
  }

  async updateCurriculum(
    curriculumId: number,
    data: UpdateCurriculumDto,
    updatedBy: number,
    file?: Express.Multer.File,
  ): Promise<CurriculumModel> {
    const imageUrl = file
      ? await this.storage.uploadFile(file, 'curriculum')
      : '';

    const updateData = {
      year: data.year,
      fileUrl: data.fileUrl,
      description: data.description,
      updatedBy,
      imageUrl,
    };

    return this.curriculumRepository.update(curriculumId, updateData);
  }

  async deleteCurriculum(
    id: number,
    updatedBy: number,
  ): Promise<CurriculumModel> {
    return this.curriculumRepository.delete(id, updatedBy);
  }
}
