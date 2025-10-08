import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  github: string;

  @ApiProperty()
  @IsString()
  presentation: string;

  @ApiProperty()
  @IsString()
  document: string;

  @ApiProperty()
  @IsString()
  figma: string;

  @ApiProperty()
  @IsString()
  youtube: string;

  @ApiProperty()
  @IsString()
  detail: string;
}
