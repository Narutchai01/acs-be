import { Injectable } from '@nestjs/common';
import { CreateCurriculumModel, CurriculumModel } from 'src/models/curriculum';

@Injectable()
export abstract class ICurriculumRepository {
  abstract create(data: CreateCurriculumModel): Promise<CurriculumModel>;
  abstract getList(): Promise<CurriculumModel[]>;
  abstract count(): Promise<number>;
  abstract getById(id: number): Promise<CurriculumModel>;
}
