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

export interface NewsModel {
  title: string;
  image: string;
  detail: string;
  categoryId: number;
  startDate: Date;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  id: number;
  category: ListTypeModel;
  user: UserModel;
}
