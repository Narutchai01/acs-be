import { Injectable } from '@nestjs/common';
import { CreateCurriculumModel, CurriculumModel } from 'src/models/curriculum';

@Injectable()
export abstract class ICurriculumRepository {
  abstract create(data: CreateCurriculumModel): Promise<CurriculumModel>;
}
