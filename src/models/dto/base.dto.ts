import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  createdBy?: number;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  updatedBy?: number | null;

  @ApiProperty()
  deletedAt?: Date | null;
}

export class ResponseDto<T> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  data: T;
}
