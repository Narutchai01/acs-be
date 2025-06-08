import { Role } from '@prisma/client';
export class RoleEntity implements Role {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  name: string;
}
