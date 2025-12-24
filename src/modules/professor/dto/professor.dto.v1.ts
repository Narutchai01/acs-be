import { AcademicPositionDto } from 'src/modules/masterdata/dto/academicposition.v1.dto';
import { MajorPositionDto } from 'src/modules/masterdata/dto/majorposition.v1.dto';
import { EducationDtoV1 } from './education.dto.v1';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { ExpertFieldsDtoV1 } from './exprt-fields.dto.v1';

export class ProfessorDtoV1 {
  id: number;
  profRoom: string;
  phone: string;
  academicPosition: AcademicPositionDto | null;
  majorPosition: MajorPositionDto | null;
  educations: EducationDtoV1[] | [];
  user: UserDto | null;
  expertFields?: ExpertFieldsDtoV1[] | [];
}
