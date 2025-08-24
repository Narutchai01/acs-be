import { BaseDto } from 'src/models/dto/base.dto';
import { ListTypeDto } from 'src/modules/type/dto/type.dto';
import { NewsDto } from './news.dto';
import { ApiProperty } from '@nestjs/swagger';

export class NewsMediaDto extends BaseDto {
  @ApiProperty()
  image: string;

  @ApiProperty({ type: () => ListTypeDto })
  type?: ListTypeDto | null;

  @ApiProperty({ type: () => NewsDto })
  news: NewsDto;
}
