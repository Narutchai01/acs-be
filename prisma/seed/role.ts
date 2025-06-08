import * as dayjs from 'dayjs';
// import { Role, PrismaClient } from 'generated/prisma';
import { PrismaClient, Role } from '@prisma/client';

const now = dayjs().toDate();

export const roles: Array<Omit<Role, 'id'>> = [
  {
    name: 'admin',
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'student',
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'professor',
    createdAt: now,
    updatedAt: now,
  },
];

export const executeRole = async (prisma: PrismaClient): Promise<void> => {
  const results = await prisma.role.createMany({ data: roles });
  console.dir({ results });
};
