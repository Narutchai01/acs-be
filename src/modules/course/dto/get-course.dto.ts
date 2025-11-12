import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryCourseDto {
  @ApiProperty()
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsOptional()
  page: number;

  @ApiProperty()
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsOptional()
  pageSize: number;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @Transform(({ value }: { value: string }) => value === 'true')
  @IsOptional()
  prerequisite?: boolean = true;

  @ApiProperty({ required: true })
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsOptional()
  typecourseId: number;

  @ApiProperty({ required: false, type: [Number] })
  @IsNumber({}, { each: true })
  @Transform(({ value }: { value: string | string[] }) => {
    if (Array.isArray(value)) {
      return value.map((v) => parseInt(v));
    }
    return [parseInt(value)];
  })
  curriculumId: number[];

  @ApiProperty({ required: false, example: 'CSS192' })
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsOptional()
  search: string;
}
