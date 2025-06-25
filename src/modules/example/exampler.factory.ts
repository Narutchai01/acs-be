import { Injectable } from '@nestjs/common';
import { ExampleModel } from 'src/models/example';
import { ExampleDto } from './dto/example.dto';

@Injectable()
export class ExampleFactory {
  mapExampleModelsToExampleDtos(data: ExampleModel[]): ExampleDto[] {
    return data.map((item) => this.mapExampleModelToExampleDto(item));
  }

  mapExampleModelToExampleDto(data: ExampleModel): ExampleDto {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
    };
  }
}
