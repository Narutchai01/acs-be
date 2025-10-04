import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
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
  firstNameEn?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastNameEn?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nickName?: string | null;
}
