import { ListTypeModel, TypeModel } from 'src/models/type';

export abstract class ITypeRepository {
  abstract getTypes(): Promise<TypeModel[]>;
  abstract getListTypes(type: string): Promise<ListTypeModel[]>;
}
