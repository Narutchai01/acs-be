import { Injectable } from '@nestjs/common';
import { majorpositionModel } from 'src/models/majorposition';

@Injectable()
export abstract class IMajorpositionRepository {
    abstract getMajorposition(): Promise<majorpositionModel[] | Error>;
}
