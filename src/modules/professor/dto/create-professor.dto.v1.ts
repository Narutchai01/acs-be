import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateProfessorDtoV1 {
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
  @IsNumber()
  @Transform(({ value }) => Number(value?.trim()))
  majorPositionId: number;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value?.trim()))
  academicPositionId: number;

  @ApiProperty()
  @IsString()
  profRoom: string;

  @ApiProperty({
    description: 'Indicates if the professor has a password set',
    example: true,
    default: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isPassword: boolean;

  @ApiProperty()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    return Array.isArray(value) ? value : [];
  })
  education: Array<{
    levelId: number;
    education: string;
    university: string;
  }>;

  @ApiProperty()
  expertFields: string[];
}
