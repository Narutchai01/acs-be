import { BaseDto } from 'src/models/dto/base.dto';
import { ListTypeDto } from 'src/modules/type/dto/type.dto';

export class NewsDto extends BaseDto {
  title: string;
  image: string;
  detail: string;
  startDate: Date;
  dueDate: Date | null;
  category: ListTypeDto;
  id: number;
}
