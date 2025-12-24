import { BaseDto } from 'src/models/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CurriculumDto } from 'src/modules/curriculum/dto/curriculum.dto';
import { TypeCourseDto } from 'src/modules/masterdata/dto/typecourse.v1.dto';
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
  typeCourse: TypeCourseDto | null;

  @ApiProperty()
  curriculum: CurriculumDto | null;

  @ApiProperty()
  preCourses: CourseDto[] | [];
}
