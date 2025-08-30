import { BaseDto } from 'src/models/dto/base.dto';

export interface TypeDto extends BaseDto {
  id: number;
  name: string;
}

export interface ListTypeDto extends BaseDto {
  id: number;
  name: string;
}
