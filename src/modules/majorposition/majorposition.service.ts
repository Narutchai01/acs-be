import { Injectable } from '@nestjs/common';
import { IMajorPositionRepository } from 'src/repositories/majorposition/majorposition.abstract';
import { QueryMajorPositionDto } from './dto/get-majorposition.dto';

@Injectable()
export class MajorPositionService {
  constructor(private majorPositionRepository: IMajorPositionRepository) {}

  async getMajorPositions(query: QueryMajorPositionDto) {
    return await this.majorPositionRepository.getMajorPositions(query);
  }
}
