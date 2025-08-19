import { Injectable } from '@nestjs/common';
import { IMajorPositionRepository } from 'src/repositories/majorposition/majorposition.abstract';
import { MajorPositionModel } from 'src/models/majorposition';
import { ITypeRepositoty } from 'src/repositories/type/type.abstact';

@Injectable()
export class MasterdataService {
  constructor(private majorPositionRepository: IMajorPositionRepository,private typeRepository: ITypeRepositoty) {}

  async getMajorPosition(): Promise<MajorPositionModel[]> {
    return await this.majorPositionRepository.get();
  }

  async getListType(type: string) {
    return this.typeRepository.getListTypes(type);
  }
}