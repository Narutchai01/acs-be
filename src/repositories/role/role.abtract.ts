import { Injectable } from '@nestjs/common';
import { RoleModel } from 'src/models/role';

@Injectable()
export abstract class IRoleRepository {
  abstract getList(): Promise<RoleModel[] | Error>;
}
