import { BaseDto } from 'src/models/dto/base.dto';

export interface TypeDto {
  id: number;
  name: string;
  createdDate?: Date;
  updatedDate?: Date;
}

export interface ListTypeDto extends BaseDto {
  id: number;
  name: string;
}
