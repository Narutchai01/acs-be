import { News } from '@prisma/client';
import { ListTypeEntity } from './type.entity';
import { UserEntity } from './user.entity';

export class NewsEntity implements News {
  title: string;
  image: string;
  detail: string;
  categoryId: number;
  startDate: Date;
  dueDate: Date | null;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
  createdBy: number;
  updatedBy: number;
  id: number;
  category: ListTypeEntity;
  user: UserEntity;
}
