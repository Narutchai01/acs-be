import { Injectable } from '@nestjs/common';
import { ITypeRepository } from './type.abstact';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { TypeFactory } from './type.factory';
import { ListTypeModel, TypeModel } from 'src/models/type';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class TypeRepository implements ITypeRepository {
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

  async getListTypeByName(type: string): Promise<ListTypeModel> {
    const data = await this.prisma.listType.findUnique({
      where: { name: type },
    });

    if (!data)
      throw new HttpException(
        `type with  name ${type} not found`,
        HttpStatus.NOT_FOUND,
      );
    return this.typeFactory.mapListTypeEntityToListTypeModel(data);
  }
}
