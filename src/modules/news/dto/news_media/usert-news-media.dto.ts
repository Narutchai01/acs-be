import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpsertNewsMediaDTO {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value === undefined ? undefined : Number(value)))
  id?: number;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  newsId: number;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  typeId: number;
}
