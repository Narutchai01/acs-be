import { BaseDto } from 'src/models/dto/base.dto';

export class CurriculumDto extends BaseDto {
  readonly id: number;
  readonly title: string;
  readonly year: string;
  readonly fileUrl: string;
  readonly description: string;
}
