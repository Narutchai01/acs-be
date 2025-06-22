import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { RoleFactory } from './role.factory';
import { RoleModel, UserRoleModel } from 'src/models/role';
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

  async getByName(name: string): Promise<RoleModel | Error> {
    try {
      const data = await this.prisma.role.findUnique({
        where: { name },
      });
      if (!data) {
        return new Error(`Role with name ${name} not found`);
      }
      return this.roleFactory.mapRoleEntityToRoleModel(data);
    } catch (error) {
      return new Error(`Failed to fetch role by name: ${error}`);
    }
  }

  async createUserRole(data: {
    userId: number;
    roleId: number;
  }): Promise<UserRoleModel> {
    const userRole = await this.prisma.userRole.create({
      data: {
        user: { connect: { id: data.userId } },
        role: { connect: { id: data.roleId } },
      },
      include: {
        user: true,
        role: true,
      },
    });
    return this.roleFactory.mapUserRoleEntityToUserRoleModel(userRole);
  }

  async validateUserRole(userId: number, role: string): Promise<boolean> {
    const userRole = await this.prisma.userRole.findFirst({
      where: {
        userId: userId,
        role: {
          name: role,
        },
      },
    });
    if (!userRole) {
      return false;
    }
    return true;
  }
}
