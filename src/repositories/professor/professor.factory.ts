import { Injectable } from '@nestjs/common';
import { UserFactory } from '../user/user.factory';

@Injectable()
export class ProfessorFactory {
  constructor(private userFactory: UserFactory) {}
}
