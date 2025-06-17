import { Injectable } from '@nestjs/common';
import { NewsModel } from 'src/models/news';

@Injectable()
export abstract class INewsRepository {
    abstract getNews(): Promise<NewsModel | Error>;
    abstract getNewsById(id: number): Promise<NewsModel | Error>;
    abstract createNew(data: {
        title: string;
        image: string;
        detail: string;
        categoryId: number;
        createdBy: number;
    }): Promise<NewsModel | Error>;
    abstract updateNew(data: {
        id: number;
        title: string;
        image: string;
        detail: string;
        categoryId: number;
        updatedBy: number;
    }): Promise<NewsModel | Error>;
    abstract deleteNew(id: number): Promise<Error>;
}
