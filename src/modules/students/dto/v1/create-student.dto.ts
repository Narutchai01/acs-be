import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty()
  @IsString()
  studentId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  linkedin?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  facebook?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  instagram?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  github?: string | null;

  @ApiProperty()
  @IsString()
  firstNameTh: string;

  @ApiProperty()
  @IsString()
  lastNameTh: string;

  @ApiProperty()
  @IsString()
  firstNameEn: string;

  @ApiProperty()
  @IsString()
  lastNameEn: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  nickName: string;
}
