import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'สมชาย' })
  @IsString()
  firstNameTh: string;

  @ApiProperty({ example: 'ใจดี' })
  @IsString()
  lastNameTh: string;

  @ApiProperty({ example: 'Somchai', required: false })
  @IsString()
  @IsOptional()
  firstNameEn?: string | null;
  @ApiProperty({ example: 'Jaidee', required: false })
  @IsString()
  @IsOptional()
  lastNameEn?: string | null;

  @ApiProperty({ example: 'Somchai@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'Somchai123' })
  @IsString()
  @IsOptional()
  nickName?: string | null;

  @ApiProperty({ example: 'Password123!' })
  @IsOptional()
  @IsString()
  password: string;
}
