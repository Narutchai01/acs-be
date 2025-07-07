import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IPrevCourseRepository {
  abstract create(data: any): Promise<any>;
}
