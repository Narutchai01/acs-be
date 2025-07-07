import { Injectable, Post } from '@nestjs/common';
import { ICurriculumRepository } from 'src/repositories/curriculum/curriculum.abstract';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { CurriculumModel } from 'src/models/curriculum';
import { Pageable } from 'src/models';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';

@Injectable()
export class CurriculumService {
  constructor(private curriculumRepository: ICurriculumRepository) {}
  @Post()
  async createCurriculum(
    curriculumData: CreateCurriculumDto,
    createdBy: number,
  ): Promise<CurriculumModel> {
    const newsData = {
      year: curriculumData.year,
      fileUrl: curriculumData.fileUrl,
      description: curriculumData.description,
      createdBy,
      updatedBy: createdBy,
    };
    return this.curriculumRepository.create(newsData);
  }

  async getCurriculums(): Promise<Pageable<CurriculumModel>> {
    const [rows, count] = await Promise.all([
      this.curriculumRepository.getList(),
      this.curriculumRepository.count(),
    ]);
    return {
      page: 1,
      pageSize: 10,
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
  ): Promise<CurriculumModel> {
    const updateData = {
      year: data.year,
      fileUrl: data.fileUrl,
      description: data.description,
      updatedBy,
    };

    return this.curriculumRepository.update(curriculumId, updateData);
  }
}
