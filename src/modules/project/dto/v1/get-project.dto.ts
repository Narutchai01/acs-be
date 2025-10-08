import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class QueryProjectDto {
  @ApiProperty()
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty()
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  pageSize: number;
}
