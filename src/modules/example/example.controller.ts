import { Controller } from '@nestjs/common';
import { ExampleService } from './example.service';
import { Get } from '@nestjs/common';
import { ExampleDto } from './dto/example.dto';
import { ExampleFactory } from './exampler.factory';

@Controller('example')
export class ExampleController {
  constructor(
    private readonly exampleService: ExampleService,
    private readonly exampleFactory: ExampleFactory,
  ) {}

  @Get()
  async getExampleData(): Promise<ExampleDto[]> {
    const examples = await this.exampleService.getExampleData();
    if (examples instanceof Error) {
      throw examples;
    }
    return this.exampleFactory.mapExampleModelsToExampleDtos(examples);
  }
}
