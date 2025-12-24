import { RefreshToken } from '@prisma/client';

export class RefresherTokenEntity implements RefreshToken {
  id: string;
  token: string;
  userId: number;
  expiry: Date;
  createdAt: Date;
  updatedAt: Date;
}
