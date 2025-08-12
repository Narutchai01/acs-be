import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class QueryCourseDto {
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  pageSize: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  searchByTypeCourse?: string;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  prerequisite?: boolean = true;
}
