import { Injectable } from '@nestjs/common';
import { ITypeRepositoty } from 'src/repositories/type/type.abstact';
import { TypeModel } from 'src/models/type';

@Injectable()
export class TypeService {
  constructor(private typeRepository: ITypeRepositoty) {}

  async getType(): Promise<TypeModel[]> {
    return await this.typeRepository.getTypes();
  }
}
