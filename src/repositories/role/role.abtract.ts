import { Injectable } from '@nestjs/common';
import { RoleModel, UserRoleModel } from 'src/models/role';
import { Prisma } from '@prisma/client';

@Injectable()
export abstract class IRoleRepository {
  abstract getList(): Promise<RoleModel[] | Error>;
  abstract getByName(name: string): Promise<RoleModel | Error>;
  abstract createUserRole(
    data: { userId: number; roleId: number } | Prisma.UserRoleCreateInput,
  ): Promise<UserRoleModel>;
  abstract validateUserRole(userId: number, role: string): Promise<boolean>;
}
