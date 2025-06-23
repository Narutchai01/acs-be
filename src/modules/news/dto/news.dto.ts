import { BaseDto } from 'src/models/dto/base.dto';
import { ListTypeDto } from 'src/modules/type/dto/type.dto';
import { ApiProperty } from '@nestjs/swagger';

export class NewsDto extends BaseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  detail: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty({ nullable: true, type: Date })
  dueDate: Date | null;

  @ApiProperty({ type: () => ListTypeDto })
  category: ListTypeDto;

  @ApiProperty()
  id: number;
}
