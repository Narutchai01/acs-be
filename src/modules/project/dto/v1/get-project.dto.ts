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
}
