import { Injectable } from '@nestjs/common';
import { ITypeRepositoty } from 'src/repositories/type/type.abstact';

@Injectable()
export class TypeService {
  constructor(private typeRepository: ITypeRepositoty) {}

  async getTypes() {
    return this.typeRepository.getTypes();
  }

  async getListType(type: string) {
    return this.typeRepository.getListTypes(type);
  }
}
