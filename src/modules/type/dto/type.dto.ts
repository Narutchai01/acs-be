import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/models/dto/base.dto';
export class TypeDto extends BaseDto {
  @ApiProperty()
  id!: number;
  @ApiProperty()
  name!: string;
}

export class ListTypeDto extends BaseDto {
  @ApiProperty()
  id!: number;
  @ApiProperty()
  name!: string;
}
