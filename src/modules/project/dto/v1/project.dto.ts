import { BaseDto } from 'src/models/dto/base.dto';
import { StudentDto } from 'src/modules/students/dto/v1/student.dto';
import { ListTypeDto } from 'src/modules/masterdata/dto/typelist.v1.dto';
import { CourseDto } from 'src/modules/course/dto/course.dto';

export class ProjectDto extends BaseDto {
  id: number;
  title: string;
  thumbnail: string;
  detail: string;
  github?: string | null;
  presentation?: string | null;
  document?: string | null;
  youtube?: string | null;
  figma?: string | null;
  projectAssets: { id: number; asset: string | null }[];
  projectMembers: StudentDto[];
  projectCategories: ListTypeDto[];
  projectFields: ListTypeDto[];
  courses: CourseDto[];
}
