import { BaseDto } from 'src/models/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CourseDto extends BaseDto {
  @ApiProperty()
  courseId: string;

  @ApiProperty()
  courseNameTh: string;

  @ApiProperty()
  courseNameEn: string;

  @ApiProperty()
  credits: string;

  @ApiProperty()
  courseDetail: string;

  @ApiProperty()
  id: number;
}
