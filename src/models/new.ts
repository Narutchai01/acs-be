import { ListTypeModel } from './type';
import { UserModel } from './user';

export interface NewModel {
    id: number;
    title: String;
    image: String;
    detail: String;
    categoryId: ListTypeModel;
    createdAt: Date;
    updatedAt?: Date | null;
    createdBy: UserModel;
    updatedBy?: UserModel;

}