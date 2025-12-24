import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class QueryProfessorDto {
  @ApiProperty({ example: 1, description: 'Page number', required: false })
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page',
    required: false,
  })
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  pageSize: number;

  @ApiProperty({
    example: 'name',
    description: 'Sort by field',
    required: false,
  })
  @IsString()
  sortBy?: string;

  @ApiProperty({
    example: 'asc',
    description: 'Sort order (asc or desc)',
    required: false,
  })
  @IsString()
  sortOrder?: 'asc' | 'desc';

  @ApiProperty({
    example: true,
    description: 'Include educations in the response',
    required: false,
  })
  @IsBoolean()
  @Transform(({ value }: { value: string }) => value === 'true')
  educations?: boolean;

  @ApiProperty({
    example: true,
    description: 'Include expert fields in the response',
    required: false,
    default: true,
  })
  @IsBoolean()
  @Transform(({ value }: { value: string }) => value === 'true')
  expertFields?: boolean;

  @ApiProperty({
    example: 'John',
    description: 'Search by professor name',
    required: false,
  })
  searchByName?: string;

  @ApiProperty({
    example: 'true',
    description: 'Filter by education level',
    required: false,
  })
  educationLevel?: string;

  @ApiProperty({
    example: true,
    description: 'Include major position in the response',
    required: false,
    default: true,
  })
  @IsBoolean()
  @Transform(({ value }: { value: string }) => value === 'true')
  majorPosition?: boolean;

  @ApiProperty({
    example: true,
    description: 'Include academic position in the response',
    required: false,
    default: true,
  })
  @IsBoolean()
  @Transform(({ value }: { value: string }) => value === 'true')
  academicPosition?: boolean;
}
