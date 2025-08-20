import { BaseDto } from 'src/models/dto/base.dto';

export class TypeCourseDto extends BaseDto {
  id: number;
  name: string;
  description: string;
}
