import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateExpertFields } from 'src/models/expertfields';

@Injectable()
export abstract class IExpertFieldsRepository {
  abstract create(
    data: CreateExpertFields[],
    transaction: Prisma.TransactionClient,
  ): Promise<void>;
}
