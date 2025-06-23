import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class QueryNewsDto {
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  pageSize: number;

  @ApiProperty({ required: false })
  category: string;
}
