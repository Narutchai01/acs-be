import { Controller, Get, Query } from '@nestjs/common';
import { TypeService } from './type.service';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  getTypes() {
    return this.typeService.getTypes();
  }

  @Get('/list')
  getListType(@Query('type') type: string) {
    return this.typeService.getListType(type);
  }
}
