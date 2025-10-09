import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryClassBookDto {
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
}
