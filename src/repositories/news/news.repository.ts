import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { INewsRepository } from './news.abtract';
import { NewsModel, NewsModelCreate, NewsModelUpdate } from 'src/models/news';
import { NewsFactory } from './news.factory';

@Injectable()
export class NewsRepository implements INewsRepository {
    constructor(
        private readonly prisma: PrismaService,
        private readonly newsFactory: NewsFactory,
    ) { }

    async getNews(): Promise<NewsModel[]> {
        try {
            const data = await this.prisma.news.findMany();
            return this.newsFactory.mapNewsEntitiesToNewsModels(data);
        } catch (error) {
            throw new Error(`Failed to fetch news ${error}`);
        }
    }

    async getNewsById(id: number): Promise<NewsModel> {
        try {
            const data = await this.prisma.news.findUnique({ where: { id } });

            if (!data) {
                throw new Error(`News with ID ${id} not found`);
            }

            return this.newsFactory.mapNewsEntityToNewsModel(data);
        } catch (error) {
            throw new Error(`Failed to fetch news by ID: ${error}`);
        }
    }

    async createNews(data: NewsModelCreate): Promise<NewsModel> {
        try {
            const created = await this.prisma.news.create({
                data: {
                    title: data.title,
                    image: data.image,
                    detail: data.detail,
                    categoryId: data.categoryId.id,
                    createdBy: data.createdBy.id,
                    updatedBy: data.updatedBy.id,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    startDate: data.startDate,
                    dueDate: data.dueDate,
                },
            });

            return this.newsFactory.mapNewsEntityToNewsModel(created);
        } catch (error) {
            throw new Error(`Failed to create news: ${error}`);
        }
    }


    async updateNews(data: NewsModelUpdate): Promise<NewsModel> {
        try {
            const updated = await this.prisma.news.update({
                where: { id: data.id },
                data: {
                    title: data.title,
                    image: data.image,
                    detail: data.detail,
                    categoryId: data.categoryId.id,
                    updatedBy: data.updatedBy.id,
                    updatedAt: data.updatedAt,
                    startDate: data.startDate,
                    dueDate: data.dueDate,
                },
            });

            return this.newsFactory.mapNewsEntityToNewsModel(updated);
        } catch (error) {
            throw new Error(`Failed to update news with ID ${data.id}: ${error}`);
        }
    }


    async deleteNews(id: number): Promise<boolean> {
        try {
            await this.prisma.news.delete({ where: { id } });
            return true;
        } catch (error) {
            throw new Error(`Failed to delete news with ID ${id}: ${error}`);
        }
    }
}
