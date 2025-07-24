import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/models/dto/base.dto';

export class UpdateCourseDto extends BaseDto {
  @ApiProperty({ required: false })
  courseId?: string;
  @ApiProperty({ required: false })
  typeCourseId?: number;
  @ApiProperty({ required: false })
  courseNameTh?: string;
  @ApiProperty({ required: false })
  courseNameEn?: string;
  @ApiProperty({ required: false })
  credits?: string;
  @ApiProperty({ required: false })
  courseDetail?: string;
  @ApiProperty({ required: false })
  curriculumId?: number;
}
