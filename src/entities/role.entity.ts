import { Role } from 'generated/prisma';

export class RoleEntity implements Role {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  name: string;
}
