import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/models/dto/base.dto';

export class UpdateCourseDto extends BaseDto {
  @ApiProperty({ required: false })
  courseId?: string;
  @ApiProperty({ required: false })
  courseName?: string;
  @ApiProperty({ required: false })
  courseDetail?: string;
}
