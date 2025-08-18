import { Controller, Get, HttpStatus } from '@nestjs/common';
import { TypeDto } from './dto/type.v1.dto';
import { TypeFactoryV1 } from './type.factory.v1';
import { success } from 'src/core/interceptors/response.helper';
import { TypeService } from './type.service.v1';

@Controller({
  path: 'type',
  version: '1',
})
export class TypeController {
  constructor(
    private readonly typeService: TypeService,
    private readonly typeFactory: TypeFactoryV1,
  ) {}

  @Get('/type')
  async getTypes() {
    const types = await this.typeService.getType();
    const dto = this.typeFactory.mapTypeModelsToDtos(types);
    return success<TypeDto[]>(dto, HttpStatus.OK);
  }
}
