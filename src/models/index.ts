export interface BaseModel {
  createdDate?: Date;
  createdBy?: number;
  updatedDate?: Date;
  updatedBy?: number | null;
  deletedDate?: Date | null;
}

export interface Pageable<T> {
  rows: T[];
  totalRecords: number;
  page: number;
  pageSize: number;
}
