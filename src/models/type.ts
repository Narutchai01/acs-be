import { BaseModel } from '.';

export interface TypeModel {
  id: number;
  name: string;
  createdDate?: Date;
  updatedDate?: Date;
}

export interface ListTypeModel extends BaseModel {
  id: number;
  name: string;
}
