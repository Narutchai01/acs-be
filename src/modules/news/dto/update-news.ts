export class UpdateNewsDto {
    id: number; 
    title: string;
    image: string;
    detail: string;
    categoryId: number;
    updatedBy: number;
    updatedAt:Date;
    startDate: Date;
    dueDate: Date;
}
