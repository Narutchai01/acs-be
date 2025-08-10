import { BaseDto } from 'src/models/dto/base.dto';

export class AcademicPositionDto extends BaseDto {
  id: number;
  positionTh: string;
  positionEn: string;
}
