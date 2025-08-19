import { Injectable } from '@nestjs/common';
import { IMajorPositionRepository } from 'src/repositories/majorposition/majorposition.abstract';
import { MajorPositionModel } from 'src/models/majorposition';
import { TypeModel } from 'src/models/type';
import { ITypeRepository } from 'src/repositories/type/type.abstact';
@Injectable()
export class MasterdataService {
  constructor(
    private majorPositionRepository: IMajorPositionRepository,
    private typeRepository: ITypeRepository,
  ) {}

  async getMajorPosition(): Promise<MajorPositionModel[]> {
    return await this.majorPositionRepository.get();
  }

  async getType(): Promise<TypeModel[]> {
    return await this.typeRepository.getTypes();
  }
}
