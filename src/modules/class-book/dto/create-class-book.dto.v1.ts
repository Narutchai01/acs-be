import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class RequestClassBookDtoV1 {
  @ApiProperty()
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value))
  readonly classof: number;

  @ApiProperty()
  @IsString()
  readonly firstYearAcademic: string;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value))
  readonly curriculumId: number;
}
