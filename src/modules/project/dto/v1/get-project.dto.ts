import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryProjectDto {
  @ApiProperty()
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty()
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  pageSize: number;

  @ApiProperty({
    required: false,
    description: 'Sort field for ordering results',
    example: 'createdAt',
  })
  @IsString()
  @IsOptional()
  sortBy?: string;

  @ApiProperty({
    required: false,
    description: 'Sort order (asc or desc)',
    example: 'asc',
  })
  @IsString()
  @IsOptional()
  sortOrder?: 'asc' | 'desc';

  @ApiProperty({
    required: false,
    description: 'Filter projects by Category IDs',
    example: '1,2,3',
  })
  @IsNumber({}, { each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      // Handle comma-separated string format like "1,2,3"
      return value.split(',').map((item: string) => parseInt(item.trim(), 10));
    } else if (Array.isArray(value)) {
      return value.map((item: unknown) => parseInt(String(item), 10));
    }
    return [];
  })
  categories?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter projects by Field IDs',
    example: '1,2,3',
  })
  @IsNumber({}, { each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      // Handle comma-separated string format like "1,2,3"
      return value.split(',').map((item: string) => parseInt(item.trim(), 10));
    } else if (Array.isArray(value)) {
      return value.map((item: unknown) => parseInt(String(item), 10));
    }
    return [];
  })
  fields?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter projects by Types IDs',
    example: '1,2,3',
  })
  @IsNumber({}, { each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      // Handle comma-separated string format like "1,2,3"
      return value.split(',').map((item: string) => parseInt(item.trim(), 10));
    } else if (Array.isArray(value)) {
      return value.map((item: unknown) => parseInt(String(item), 10));
    }
    return [];
  })
  types?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter projects by Course IDs',
    example: '1,2,3',
  })
  @IsNumber({}, { each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      // Handle comma-separated string format like "1,2,3"
      return value.split(',').map((item: string) => parseInt(item.trim(), 10));
    } else if (Array.isArray(value)) {
      return value.map((item: unknown) => parseInt(String(item), 10));
    }
    return [];
  })
  courses?: number[];

 @ApiProperty({ required: false })
 @IsString()
 @IsOptional()
 @Transform(({ value }) => (value ? value : null))
 search?: string;
}
