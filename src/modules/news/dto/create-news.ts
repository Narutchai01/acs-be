export class CreateNewsDto {
    title: string;
    image: string;
    detail: string;
    categoryId: number;
    createdBy?: number;
    updatedBy?: number;
    createdAt?: Date;
    updatedAt?: Date;
    startDate: Date;
    dueDate: Date;
}
