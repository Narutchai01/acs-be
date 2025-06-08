import { ListTypeModel, TypeModel } from 'src/models/type';

export abstract class ITypeRepositoty {
  abstract getTypes(): Promise<TypeModel[]>;
  abstract getListTypes(): Promise<ListTypeModel[]>;
}
