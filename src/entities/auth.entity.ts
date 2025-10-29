import { ForgetPasswordCredential } from '@prisma/client';

export class ForgetPasswordEntity implements ForgetPasswordCredential {
  refferenceCode: string;
  userId: number;
  expiredAt: Date;
  deletedAt: Date | null;
  createdBy: number;
  updatedBy: number;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
