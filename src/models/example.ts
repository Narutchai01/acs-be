import { BaseModel } from '.';

export interface ExampleModelCreate {
  name: string;
  description: string;
}

export interface ExampleModel extends BaseModel {
  id: number;
  name: string;
  description: string;
}
