import { Controller, Get } from '@nestjs/common';
import { TypeService } from './type.service';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  getTypes() {
    return this.typeService.getTypes();
  }

  @Get('/list')
  getListType() {
    return this.typeService.getListtype();
  }
}
