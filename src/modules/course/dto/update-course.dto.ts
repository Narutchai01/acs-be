import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/models/dto/base.dto';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateCourseDto extends BaseDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  courseId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  typeCourseId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  courseNameTh?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  courseNameEn?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  credits?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  courseDetail?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  curriculumId?: number;
}