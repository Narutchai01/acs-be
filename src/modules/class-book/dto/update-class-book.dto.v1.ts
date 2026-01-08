import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateClassBookDtoV1 {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }: { value: string }) =>
      value !== null ? Number(value) : value,
  )
  classof: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstYearAcademic: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }: { value: string }) =>
      value !== null ? Number(value) : value,
  )
  curriculumId: number;
}
