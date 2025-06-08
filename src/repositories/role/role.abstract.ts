import { RoleModel } from '../../models/role';

export abstract class IRoleRepository {
  abstract getRoles(): Promise<RoleModel[]>;
}
