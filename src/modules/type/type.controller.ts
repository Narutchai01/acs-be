import { Controller, Get, Query, Res } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeFactory } from './type.factory';
import { Response } from 'express';

@Controller('type')
export class TypeController {
  constructor(
    private readonly typeService: TypeService,
    private readonly typeFactory: TypeFactory,
  ) {}

  @Get()
  async getTypes(@Res() res: Response) {
    const types = await this.typeService.getTypes();
    const dtos = this.typeFactory.mapTypeModelsToTypeDtos(types);
    return res.json({
      status: true,
      data: dtos,
      error: null,
    });
  }

  @Get('/list')
  async getListType(@Query('type') type: string, @Res() res: Response) {
    const types = await this.typeService.getListType(type);
    const dtos = this.typeFactory.mapListTypeModelsToListTypeDtos(types);
    return res.json({
      status: true,
      data: dtos,
      error: null,
    });
  }
}
