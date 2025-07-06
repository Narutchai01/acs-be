import { Injectable } from '@nestjs/common';
import { ICourseRepository } from 'src/repositories/course/course.abstract';

@Injectable()
export class TypecourseService {
  constructor(private courseRepository: ICourseRepository) {}

  async getTypeCourse() {
    return this.courseRepository.getTypeCourse();
  }
}
