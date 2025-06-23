import { News } from '@prisma/client';
import { ListTypeEntity } from './type.entity';
import { UserEntity } from './user.entity';

export class NewsEntity implements News {
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
  category: ListTypeEntity;
  user: UserEntity;
}
