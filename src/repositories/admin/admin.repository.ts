import { Injectable } from '@nestjs/common';
import { IAdminRepository } from './admin.abstract';
import { AdminFactory } from './admin.factory';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { AdminModel } from 'src/models/admin';

@Injectable()
export class AdminRepository implements IAdminRepository {
  constructor(
    private adminFactory: AdminFactory,
    private prisma: PrismaService,
  ) {}

  async create(admin: number): Promise<AdminModel | Error> {
    const newAdmin = await this.prisma.admin.create({
      data: {
        userId: admin,
      },
      include: {
        user: true,
      },
    });

    return this.adminFactory.mapAdminEntityToAdminModel(newAdmin);
  }
}
