import { News } from '@prisma/client';
import { UserEntity } from './user.entity';
import { ListTypeEntity } from './type.entity';

export class NewsEntity implements News {
    id: number;
    title: string;
    image: string;
    detail: string;
    categoryId: ListTypeEntity;
    createdAt: Date;
    updatedAt: Date | null;
    createdBy: UserEntity;
    updatedBy: UserEntity | null;
}