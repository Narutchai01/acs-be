import { BaseDto } from 'src/models/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MajorPositionDto extends BaseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  positionTh: string;

  @ApiProperty()
  positionEn: string;
}
