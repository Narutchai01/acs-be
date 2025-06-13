import { Injectable } from '@nestjs/common';
import { ExampleEntity } from 'src/entities/example.entity';
import { ExampleModel } from 'src/models/example';

@Injectable()
export class ExampleFactory {
  constructor() {}

  mapExampleEntitiesToExampleModels(data: ExampleEntity[]): ExampleModel[] {
    return data.map((example) => this.mapExampleEntityToExampleModel(example));
  }

  mapExampleEntityToExampleModel(data: ExampleEntity): ExampleModel {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    };
  }
}
