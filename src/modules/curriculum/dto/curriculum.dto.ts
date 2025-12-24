import { BaseDto } from 'src/models/dto/base.dto';

export class CurriculumDto extends BaseDto {
  readonly id: number;
  readonly year: string;
  readonly fileUrl: string;
  readonly description: string;
}
