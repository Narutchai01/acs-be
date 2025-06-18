import { New } from '@prisma/client';
import { UserEntity } from './user.entity';
import { ListTypeEntity } from './type.entity';

export class NewsEntity implements New {
    id: number;
    title: string;
    image: string;
    detail: string;
    categoryId: ListTypeEntity;
    createdAt: Date;
    updatedAt: Date | null;
    createdBy: UserEntity;
    updatedBy: UserEntity | null;
    startDate: Date;
    dueDate :Date;
}
