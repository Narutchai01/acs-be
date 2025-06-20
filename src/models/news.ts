import { ListTypeModel } from './type';
import { UserRefModel } from './user';
import { ListTypeModelRef } from './type';

export interface NewsModelCreate {
    title: string;
    image: string;
    detail: string;
    categoryId: ListTypeModelRef;
    createdAt: Date;
    updatedAt: Date;
    createdBy: UserRefModel;
    updatedBy: UserRefModel;
    startDate: Date;
    dueDate: Date;
}

export interface NewsModelUpdate {
    id: number;
    title: string;
    image: string;
    detail: string;
    categoryId: ListTypeModelRef;
    updatedAt: Date;
    updatedBy: UserRefModel;
    startDate: Date;
    dueDate: Date;
}

export interface NewsModel {
    id: number;
    title: string;
    image: string;
    detail: string;
    categoryId: ListTypeModelRef;
    createdAt: Date;
    updatedAt: Date;
    createdBy: UserRefModel;
    updatedBy: UserRefModel;
    startDate: Date;
    dueDate: Date;
}
