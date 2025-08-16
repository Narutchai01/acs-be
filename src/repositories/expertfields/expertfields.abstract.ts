import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateExpertField } from 'src/models/expertfields';

@Injectable()
export abstract class IExpertFieldsRepository {
  abstract create(
    data: CreateExpertField[],
    transaction: Prisma.TransactionClient,
  ): Promise<void>;
}
