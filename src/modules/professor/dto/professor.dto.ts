import { BaseDto } from 'src/models/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProfessorDto extends BaseDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  academicPosition: number;

  @ApiProperty()
  majorPosition: number;

  @ApiProperty()
  profRoom: string;

  @ApiProperty()
  fieldOffexpertise: string;

  @ApiProperty()
  id: number;
}
