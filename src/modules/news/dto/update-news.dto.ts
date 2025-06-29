import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/models/dto/base.dto';

export class UpdateNewsDto extends BaseDto {
  @ApiProperty({ required: false })
  title?: string;
  @ApiProperty({ required: false })
  detail?: string;
  @ApiProperty({ required: false })
  categoryId?: number;
  @ApiProperty({ required: false })
  startDate?: Date;
  @ApiProperty({ required: false })
  dueDate?: Date | null;
}
