import { Injectable } from '@nestjs/common';
import { MajorPositionModel } from 'src/models/majorposition';
import { QueryMajorPositionDto } from 'src/modules/majorposition/dto/get-majorposition.dto';
@Injectable()
export abstract class IMajorPositionRepository {
  abstract getMajorPosition(
    query: QueryMajorPositionDto,
  ): Promise<MajorPositionModel[]>;
}
