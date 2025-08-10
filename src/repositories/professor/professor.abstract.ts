import { Injectable } from '@nestjs/common';
import { ProfesorModel } from 'src/models/professor';

@Injectable()
export abstract class IProfessorRepository {
  abstract create(data: ProfesorModel): Promise<ProfesorModel>;
}
