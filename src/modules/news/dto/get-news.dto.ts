import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryNewsDto {
  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
    default: 1,
  })
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
    default: 10,
  })
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  pageSize: number;

  @ApiProperty({
    required: false,
    description: 'Category of the news',
    example: 'Technology',
    default: null,
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value ? value.trim() : null))
  category?: string;
}
