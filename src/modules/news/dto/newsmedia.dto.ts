import { BaseDto } from 'src/models/dto/base.dto';
import { NewsDto } from './news.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ListTypeDto } from 'src/modules/masterdata/dto/typelist.v1.dto';

export class NewsMediaDto extends BaseDto {
  @ApiProperty()
  image: string;

  @ApiProperty({ type: () => ListTypeDto })
  type?: ListTypeDto | null;

  @ApiProperty({ type: () => NewsDto })
  news: NewsDto;
}
