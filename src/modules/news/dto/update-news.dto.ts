import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/models/dto/base.dto';
import { IsString, IsOptional, IsNumber, IsDate } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class UpdateNewsDto extends BaseDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  detail?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === 'null') return undefined;
    return Number(value);
  })
  @IsNumber()
  categoryId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => value === 'null' || value === '' ? null : new Date(value))
  @IsDate()
  startDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => value === 'null' || value === '' ? null : new Date(value))
  @IsDate()
  dueDate?: Date | null;
}
