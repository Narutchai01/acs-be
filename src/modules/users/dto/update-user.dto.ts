import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  firstNameTh?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastNameTh?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  firstNameEn?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastNameEn?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nickName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password?: string;
}
