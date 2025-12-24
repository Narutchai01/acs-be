import { ListType, Type } from '@prisma/client';

export class TypeEntity implements Type {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ListTypeEntity implements ListType {
  id: number;
  name: string;
  typeId: number;
  createdAt: Date;
  updatedAt: Date;
}
