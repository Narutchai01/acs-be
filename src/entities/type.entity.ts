import { ListType, Type } from '@prisma/client';

export class TypeEntity implements Type {
  id: number;
  name: string;
  createdDate: Date;
  updatedDate: Date;
}

export class ListTypeEntity implements ListType {
  id: number;
  name: string;
  typeId: number;
  createdDate: Date;
  updatedDate: Date;
}
