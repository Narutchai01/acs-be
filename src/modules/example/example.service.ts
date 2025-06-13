import { Injectable } from '@nestjs/common';
import { IExampleRepository } from 'src/repositories/example/example.abstract';
import { ExampleModel } from 'src/models/example';
import { CreateExampleDto } from './dto/create-example';

@Injectable()
export class ExampleService {
  constructor(private exampleRepository: IExampleRepository) {}

  async getExampleData(): Promise<ExampleModel[] | Error> {
    return this.exampleRepository.getExampleData();
  }
  async createExampleData(
    data: CreateExampleDto,
  ): Promise<ExampleModel | Error> {
    return this.exampleRepository.createExampleData(data);
  }
}
