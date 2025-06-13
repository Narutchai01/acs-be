import { Injectable } from '@nestjs/common';
import { ExampleModel, ExampleModelCreate } from 'src/models/example';

@Injectable()
export abstract class IExampleRepository {
  abstract getExampleData(): Promise<ExampleModel[] | Error>;
  abstract createExampleData(
    data: ExampleModelCreate,
  ): Promise<ExampleModel | Error>;
}
