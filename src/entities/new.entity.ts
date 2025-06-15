import { ListType, New } from '@prisma/client'; //from index.d.ts
import { UserEntity } from './user.entity';
import { ListTypeEntity } from './type.entity';

export class NewEntity implements New {
    id: number;
    title: String;
    image: String;
    detail: String;
    categoryId: ListTypeEntity;
    createdAt: Date;
    updatedAt: Date | null;
    createdBy: UserEntity;
    updatedBy: UserEntity | null;
}