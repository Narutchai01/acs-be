import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
export class QueryCurriculumDto {
  @ApiProperty({
    required: false,
    description: 'Page number for pagination',
    example: 1,
  })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  page?: number;

  @ApiProperty({
    required: false,
    description: 'Number of items per page',
    example: 10,
  })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  pageSize?: number;

  @ApiProperty({
    required: false,
    description: 'Sort field for ordering results',
    example: 'title',
  })
  @IsOptional()
  sortBy?: string;

  @ApiProperty({
    required: false,
    description: 'Sort order (asc or desc)',
    example: 'asc',
  })
  @IsOptional()
  sortOrder?: 'asc' | 'desc';

  @ApiProperty({
    required: false,
    description: 'Search by year',
    example: '2021',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  search?: string;
}
