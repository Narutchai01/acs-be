import { BaseDto } from 'src/models/dto/base.dto';
import { ClassBookDtoV1 } from 'src/modules/class-book/dto/class-book.dto.v1';
import { UserDto } from 'src/modules/users/dto/user.dto';

export class StudentDto extends BaseDto {
  id: number;
  studentId: string;
  linkin: string | null;
  facebook: string | null;
  instragram: string | null;
  github: string | null;
  classBook?: ClassBookDtoV1;
  user?: UserDto;
}
