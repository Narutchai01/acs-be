import { Injectable } from '@nestjs/common';
import { CreateExpertFields } from 'src/models/expertfields';
import { IExpertFieldsRepository } from './expertfields.abstract';
import { PrismaService } from 'src/provider/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExpertFieldsRepository extends IExpertFieldsRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(
    data: CreateExpertFields[],
    transaction: Prisma.TransactionClient,
  ): Promise<void> {
    await transaction.expertFields.createMany({ data, skipDuplicates: true });
  }
}
