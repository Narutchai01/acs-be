import { Injectable } from '@nestjs/common';
import { IMajorPositionRepository } from 'src/repositories/majorposition/majorposition.abstract';
import { QueryMajorPositionDto } from './dto/get-majorposition.dto';
import { MajorPositionModel } from 'src/models/majorposition';

@Injectable()
export class MajorPositionService {
  constructor(private majorPositionRepository: IMajorPositionRepository) {}

  async getMajorposition(
    query: QueryMajorPositionDto,
  ): Promise<MajorPositionModel[] | Error> {
    return await this.majorPositionRepository.getMajorposition(query);
  }
}
