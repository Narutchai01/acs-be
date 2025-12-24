import { BaseDto } from 'src/models/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ListTypeDto } from 'src/modules/masterdata/dto/typelist.v1.dto';

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
