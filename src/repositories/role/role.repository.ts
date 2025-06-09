import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { RoleFactory } from './role.factory';
import { RoleModel } from 'src/models/role';
import { IRoleRepository } from './role.abtract';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    protected prisma: PrismaService,
    protected roleFactory: RoleFactory,
  ) {}

  async getList(): Promise<RoleModel[] | Error> {
    try {
      const data = await this.prisma.role.findMany();
      return this.roleFactory.mapRoleEntitiesToRoleModels(data);
    } catch (error) {
      return new Error(`Failed to fetch roles: ${error}`);
    }
  }
}
