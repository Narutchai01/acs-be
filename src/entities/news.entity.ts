import { News } from '@prisma/client';
import { NewsMedia } from '@prisma/client';
import { ListTypeEntity } from './type.entity';
import { UserEntity } from './user.entity';

export class NewsEntity implements News {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  title: string;
  image: string;
  detail: string;
  categoryId: number;
  startDate: Date;
  dueDate: Date | null;
  id: number;
  category: ListTypeEntity;
  user: UserEntity;
}

export class NewsMediaEntity implements NewsMedia {
  id: number;
  image: string;
  newsId: number;
  typeId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  news: NewsEntity;
  type?: ListTypeEntity | null;
  user?: UserEntity | null;
}
