import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryNewsMediaDto {
  @IsString()
  type: string;

  @IsBoolean()
  @IsOptional()
  isUser: boolean;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  pageSize: number;
}
