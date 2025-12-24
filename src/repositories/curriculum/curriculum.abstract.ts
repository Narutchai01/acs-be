import { Injectable } from '@nestjs/common';
import {
  CreateCurriculumModel,
  CurriculumModel,
  UpdateCurriculumModel,
} from 'src/models/curriculum';
import { QueryCurriculumDto } from 'src/modules/curriculum/dto/v1/get-curriculum.dto';

@Injectable()
export abstract class ICurriculumRepository {
  abstract create(data: CreateCurriculumModel): Promise<CurriculumModel>;
  abstract getList(query: QueryCurriculumDto): Promise<CurriculumModel[]>;
  abstract count(): Promise<number>;
  abstract getById(id: number): Promise<CurriculumModel>;
  abstract update(
    curriculumId: number,
    data: UpdateCurriculumModel,
  ): Promise<CurriculumModel>;
  abstract delete(id: number, updatedBy: number): Promise<CurriculumModel>;
}
