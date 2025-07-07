import { IsOptional, IsString } from 'class-validator';

export class UpdateCurriculumDto {
  @IsString()
  @IsOptional()
  year: string;

  @IsString()
  @IsOptional()
  fileUrl: string;

  @IsString()
  @IsOptional()
  description: string;
}
