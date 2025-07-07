import { Injectable, Post } from '@nestjs/common';
import { ICurriculumRepository } from 'src/repositories/curriculum/curriculum.abstract';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { CurriculumModel } from 'src/models/curriculum';

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
}
