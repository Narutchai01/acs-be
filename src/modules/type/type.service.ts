import { Injectable } from '@nestjs/common';
import { ITypeRepository } from 'src/repositories/type/type.abstact';

@Injectable()
export class TypeService {
  constructor(private typeRepository: ITypeRepository) {}

  async getTypes() {
    return this.typeRepository.getTypes();
  }

  async getListType(type: string) {
    return this.typeRepository.getListTypes(type);
  }
}
