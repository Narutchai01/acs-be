import { BaseDto } from 'src/models/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfessorDto extends BaseDto {
  @ApiProperty({ required: false })
  @IsOptional()
  userId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  academicPosition?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  majorPosition?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  profRoom?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fieldOffexpertise?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstNameTh?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastNameTh?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstNameEn?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastNameEn?: string;
}
