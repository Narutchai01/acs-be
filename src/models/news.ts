import { ListTypeModel } from './type';
import { UserModel } from './user';

export interface NewsModel {
    id: number;
    title: string;
    image: string;
    detail: string;
    categoryId: ListTypeModel;
    createdAt: Date;
    updatedAt?: Date | null;
    createdBy: UserModel;
    updatedBy?: UserModel;

}
