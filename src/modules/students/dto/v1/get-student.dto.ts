import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class QueryStudentsDto {
  @ApiProperty({
    required: true,
    description: 'Page number for pagination',
    example: 1,
    default: 1,
  })
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value))
  page: number;

  @ApiProperty({
    required: true,
    description: 'Number of items per page',
    example: 10,
    default: 10,
  })
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value))
  pageSize: number;

  @ApiProperty({
    required: true,
    description: 'Class book ID to filter students',
    example: 1,
    default: 1,
  })
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value))
  classBookId: number;

  @ApiProperty({
    required: true,
    description: 'Search term to filter students by name or ID',
    example: 'John',
  })
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  search: string;

  @ApiProperty({
    required: false,
    description: 'Sort by field',
    example: 'studentId',
    default: 'studentId',
  })
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  sortBy?: string;

  @ApiProperty({
    required: false,
    description: 'Sort order (asc or desc)',
    example: 'asc',
    default: 'asc',
  })
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  sortOrder?: 'asc' | 'desc';
}
