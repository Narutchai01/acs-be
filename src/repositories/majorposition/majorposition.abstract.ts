import { Injectable } from '@nestjs/common';
import { MajorPositionModel } from 'src/models/majorposition';
@Injectable()
export abstract class IMajorPositionRepository {
  abstract get(): Promise<MajorPositionModel[]>;
}
