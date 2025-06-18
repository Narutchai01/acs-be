import { New } from '@prisma/client';
export class NewsEntity implements New {
    id: number;
    title: string;
    image: string;
    detail: string;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date; 
    createdBy: number; 
    updatedBy: number;
    startDate: Date;
    dueDate: Date;
}
