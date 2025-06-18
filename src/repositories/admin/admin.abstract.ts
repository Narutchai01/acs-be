import { AdminModel } from 'src/models/admin';
import { Injectable } from '@nestjs/common';
@Injectable()
export abstract class IAdminRepository {
  abstract create(admin: number): Promise<AdminModel | Error>;
}
