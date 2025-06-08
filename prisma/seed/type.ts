import * as dayjs from 'dayjs';
import { ListType, PrismaClient, Type } from '@prisma/client';

const now = dayjs().toDate();

export const types: Array<Omit<Type, 'id'>> = [
  {
    name: 'type',
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'field',
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'category',
    createdAt: now,
    updatedAt: now,
  },
];

export const listTypes: Array<Omit<ListType, 'id'>> = [
  {
    name: 'Artificial intelligence',
    typeId: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'Network',
    typeId: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'Cloud computing',
    typeId: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'Security',
    typeId: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'Computer Architecture',
    typeId: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'Software Engineering',
    typeId: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'Computational Theory',
    typeId: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'GIS',
    typeId: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'Game Design',
    typeId: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'Data Science and analytics',
    typeId: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'Data Structures and Algorithms',
    typeId: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'Research',
    typeId: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'Web Application',
    typeId: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'Mobile Application',
    typeId: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'Internet Of Things',
    typeId: 1,
    createdAt: now,
    updatedAt: now,
  },
];

export const executeType = async (prisma: PrismaClient): Promise<void> => {
  const existingTypes = await prisma.type.findMany({});

  if (existingTypes.length > 0) {
    console.log('Types already exist, skipping creation.');
    return;
  }
  const results = await prisma.type.createMany({ data: types });
  console.dir({ results });
};

export const executeListType = async (Prisma: PrismaClient): Promise<void> => {
  const existingListTypes = await Prisma.listType.findMany({});

  if (existingListTypes.length > 0) {
    console.log('List types already exist, skipping creation.');
    return;
  }
  const results = await Prisma.listType.createMany({ data: listTypes });
  console.dir({ results });
};
