import { ListTypeModel } from './type';
import { UserModel } from './user';

export interface News {
  id: number;
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
  category: ListTypeModel;
  user: UserModel;
}
