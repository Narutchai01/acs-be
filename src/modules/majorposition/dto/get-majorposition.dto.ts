import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryMajorPositionDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  searchByMajorPosition?: string;
}
