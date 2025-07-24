import { BaseDto } from 'src/models/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CurriculumDto } from 'src/modules/curriculum/dto/curriculum.dto';

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

  @ApiProperty()
  curriculum: CurriculumDto | null;

  @ApiProperty()
  preCourses: CourseDto[] | [];
}
