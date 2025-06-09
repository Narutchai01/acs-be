import { Injectable } from '@nestjs/common';
import { ITypeRepositoty } from './type.abstact';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { TypeFactory } from './type.factory';
import { ListTypeModel, TypeModel } from 'src/models/type';

@Injectable()
export class TypeRepository implements ITypeRepositoty {
  constructor(
    private prisma: PrismaService,
    private typeFactory: TypeFactory,
  ) {}

  async getTypes(): Promise<TypeModel[]> {
    const data = await this.prisma.type.findMany();
    return this.typeFactory.mapTypeEntitiesToTypeModels(data);
  }

  async getListTypes(type: string): Promise<ListTypeModel[]> {
    const data = await this.prisma.listType.findMany({
      where: {
        type: {
          name: type,
        },
      },
    });

    return this.typeFactory.mapListTypeEntitiesToListTypeModels(data);
  }
}
