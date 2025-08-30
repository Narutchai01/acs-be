import { Injectable } from '@nestjs/common';
import { IExampleRepository } from './example.abstract';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { ExampleFactory } from './example.factory';
import { ExampleModel, ExampleModelCreate } from 'src/models/example';
import { ExampleEntity } from 'src/entities/example.entity';

@Injectable()
export class ExampleRepository implements IExampleRepository {
  constructor(
    private prisma: PrismaService,
    private exampleFactory: ExampleFactory,
  ) {}

  async getExampleData(): Promise<ExampleModel[] | Error> {
    try {
      const data = await this.prisma.example.findMany();
      if (!data) {
        return new Error('No example data found');
      }
      return this.exampleFactory.mapExampleEntitiesToExampleModels(
        data as ExampleEntity[],
      );
    } catch (error) {
      return new Error(
        error instanceof Error
          ? error.message
          : 'An error occurred while fetching example data',
      );
    }
  }

  async createExampleData(
    data: ExampleModelCreate,
  ): Promise<ExampleModel | Error> {
    try {
      const createdData = await this.prisma.example.create({ data });
      return this.exampleFactory.mapExampleEntityToExampleModel(
        createdData as ExampleEntity,
      );
    } catch (error) {
      return new Error(
        error instanceof Error
          ? error.message
          : 'An error occurred while creating example data',
      );
    }
  }
}
