import { Injectable } from '@nestjs/common';
import { CreatePrevCourseModel, PrevCourseModel } from 'src/models/prevcourse';

@Injectable()
export abstract class IPrevCourseRepository {
  abstract create(data: CreatePrevCourseModel): Promise<PrevCourseModel>;
}
