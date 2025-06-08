import { Injectable } from '@nestjs/common';
import { IRoleRepository } from './role.abstract';
import { RoleFactory } from './role.factory';
import { RoleModel } from '../../models/role';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    private prisma: PrismaService,
    private roleFactory: RoleFactory,
  ) {}

  async getRoles(): Promise<RoleModel[]> {
    const data = await this.prisma.role.findMany();
    return this.roleFactory.mapRoleEntitiesToRoleModels(data);
  }
}
