import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty()
  createdDate?: Date;

  @ApiProperty()
  createdBy?: number;

  @ApiProperty()
  updatedDate?: Date;

  @ApiProperty()
  updatedBy?: number | null;

  @ApiProperty()
  deletedDate?: Date | null;
}

export class ResponseDto<T> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  data: T;
}
