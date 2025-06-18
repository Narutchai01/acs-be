import { Injectable } from '@nestjs/common';
import { NewsModel } from 'src/models/news';

@Injectable()
export class UsersFactory {
    constructor() {}

    mapUserModelToUserDto(data: NewsModel): any {
        return {
            id: data.id,
            title: data.title,
            image: data.image,
            detail: data.detail,
            categoryId: data.categoryId.id,
            createdAt: data.createdAt,
            createdBy: data.createdBy.id,
            updatedBy: data.updatedBy?.id,
            startDate: data.startDate,
            dueDate: data.dueDate,
        };
    }
}
