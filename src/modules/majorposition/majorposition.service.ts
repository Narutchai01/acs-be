import { Injectable } from '@nestjs/common';
import { IMajorPositionRepository } from 'src/repositories/majorposition/majorposition.abstract';
import { MajorPositionModel } from 'src/models/majorposition';

@Injectable()
export class MajorPositionService {
  constructor(private majorPositionRepository: IMajorPositionRepository) {}

  async getMajorPosition(): Promise<MajorPositionModel[]> {
    return await this.majorPositionRepository.get();
  }
}
