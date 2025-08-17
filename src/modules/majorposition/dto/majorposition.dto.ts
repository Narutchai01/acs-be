import { BaseDto } from 'src/models/dto/base.dto';

export class MajorPositionDto extends BaseDto {
  id: number;
  positionTh: string;
  positionEn: string;
}
