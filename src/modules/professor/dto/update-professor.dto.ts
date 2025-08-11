import { BaseDto } from 'src/models/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfessorDto extends BaseDto {
  @ApiProperty({ required: false })
  userId?: number;

  @ApiProperty({ required: false })
  academicPosition?: number;

  @ApiProperty({ required: false })
  majorPosition?: number;

  @ApiProperty({ required: false })
  profRoom?: string;

  @ApiProperty({ required: false })
  fieldOffexpertise?: number;
}
