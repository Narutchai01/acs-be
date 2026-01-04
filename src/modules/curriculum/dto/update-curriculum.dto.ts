import { IsOptional, IsString } from 'class-validator';

export class UpdateCurriculumDto {
  @IsString()
  @IsOptional()
  year: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  fileUrl: string;

  @IsString()
  @IsOptional()
  description: string;
}
