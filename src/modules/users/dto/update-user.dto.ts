import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  firstNameTh?: string;

  @ApiProperty({ required: false })
  @IsString()
  lastNameTh?: string;

  @ApiProperty({ required: false })
  @IsString()
  firstNameEn?: string | null;

  @ApiProperty({ required: false })
  @IsString()
  lastNameEn?: string | null;

  @ApiProperty({ required: false })
  @IsString()
  email?: string | null;

  @ApiProperty({ required: false })
  @IsString()
  nickName?: string | null;
}
