import { Injectable } from '@nestjs/common';
import { TypeCourseModel } from 'src/models/course';

@Injectable()
export abstract class ITypeCourseRepository {
  abstract getTypeCourse(): Promise<TypeCourseModel[]>;
}
