import { Injectable } from '@nestjs/common';
import { ITypeCourseRepository } from 'src/repositories/typecourse/typecourse.abstract';

@Injectable()
export class TypecourseService {
  constructor(private typeCourseRepository: ITypeCourseRepository) {}

  async getTypeCourse() {
    return this.typeCourseRepository.getTypeCourse();
  }
}
