import { BaseModel } from '.';
import { ListTypeModel } from './type';
import { UserModel } from './user';

export interface CreateNewsModel {
  title: string;
  image: string;
  detail: string;
  categoryId: number;
  startDate: Date;
  dueDate: Date | null;
  createdBy: number;
  updatedBy: number;
}

export interface UpdateNewsModel extends BaseModel {
  title: string;
  image: string;
  detail: string;
  categoryId: number;
  startDate: Date;
  dueDate: Date | null;
}

export interface NewsModel extends BaseModel {
  id: number;
  title: string;
  image: string;
  detail: string;
  categoryId: number;
  startDate: Date;
  dueDate: Date | null;
  category: ListTypeModel;
  user: UserModel;
}

export interface NewsMediaModel extends BaseModel {
  id: number;
  image: string;
  newsId: number;
  typeId: number;
  news: NewsModel;
  type?: ListTypeModel | null;
  user?: UserModel | null;
}

export interface CreateNewsMediaModel extends BaseModel {
  image: string;
  newsId: number;
  typeId: number;
  createdBy: number;
  updatedBy: number;
}

export interface UpsertNewsMediaModel extends BaseModel {
  id?: number;
  image: string;
  newsId: number;
  typeId: number;
  createdBy: number;
  updatedBy: number;
}
