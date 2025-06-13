export interface ExampleModelCreate {
  name: string;
  description: string;
}

export interface ExampleModel {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number | null;
  updatedBy: number | null;
}
