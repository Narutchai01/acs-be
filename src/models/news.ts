import { ListTypeModel } from './type';
import { UserModel } from './user';

export interface NewsModelCreate {
    title: string;
    image: string;
    detail: string;
    categoryId: ListTypeModel;
    createdAt: Date;
    createdBy: UserModel;
    startDate: Date;
    dueDate: Date;
}

export interface NewsModelUpdate {
    id: number;
    title: string;
    image: string;
    detail: string;
    categoryId: ListTypeModel;
    updatedAt: Date;
    updatedBy: UserModel;
    startDate: Date;
    dueDate: Date;
}

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
    startDate: Date;
    dueDate: Date;
}
