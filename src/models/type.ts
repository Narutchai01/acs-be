import { BaseModel } from '.';

export interface TypeModel extends BaseModel {
  id: number;
  name: string;
}

export interface ListTypeModel extends BaseModel {
  id: number;
  name: string;
}
