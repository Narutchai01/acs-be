import { Injectable } from '@nestjs/common';
import { CreateEducationModel, EducationModel } from 'src/models/education';

@Injectable()
export abstract class IEducationRepository {
  abstract create(data: CreateEducationModel): Promise<EducationModel>;
}
