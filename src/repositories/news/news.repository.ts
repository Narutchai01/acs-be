import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { INewsRepository } from './news.abtract';
import { NewsModel } from 'src/models/news';
import { NewsFactory } from './news.factory';

@Injectable()
export class NewsRepository implements INewsRepository {
    constructor(
        private readonly prisma: PrismaService,
        private readonly newsFactory: NewsFactory,
    ) { }

    async getNews(): Promise<NewsModel[] | Error> {
        try {
            const data = await this.prisma.news.findMany();
            return this.newsFactory.mapNewsEntitiesToNewsModels(data);
        } catch (error) {
            return new Error(`Failed to fetch news: ${error}`);
        }
    }

    async getNewsById(id: number): Promise<NewsModel | Error> {
        try {
            const data = await this.prisma.news.findUnique({
                where: { id },
            });

            if (!data) {
                return new Error(`News with ID ${id} not found`);
            }

            return this.newsFactory.mapNewsEntityToNewsModel(data);
        } catch (error) {
            return new Error(`Failed to fetch news by ID: ${error}`);
        }
    }

    async createNew(): Promise<NewsModel | Error> {
        try {
            const created = await this.prisma.news.create({ data: input });
            return this.newsFactory.mapNewsEntityToNewsModel(created);
        } catch (error) {
            return new Error(`Failed to create news: ${error}`);
        }
    }

    async updateNew(): Promise<NewsModel | Error> {
        try {
            const updated = await this.prisma.news.update({
                where: { id },
                data: input,
            });
            return this.newsFactory.mapNewsEntityToNewsModel(updated);
        } catch (error) {
            return new Error(`Failed to update news with ID ${id}: ${error}`);
        }
    }

    async deleteNew(id: number): Promise<boolean | Error> {
        try {
            await this.prisma.news.delete({
                where: { id },
            });
            return true;
        } catch (error) {
            return new Error(`Failed to delete news with ID ${id}: ${error}`);
        }
    }
}
