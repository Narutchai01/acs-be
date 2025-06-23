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
  {
    name: 'news',
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
  {
    name: 'ข่าวและกิจกรรม',
    typeId: 4,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'ความสำเร็จ',
    typeId: 4,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: 'งานกิจกรรมนักศึกษา',
    typeId: 4,
    createdAt: now,
    updatedAt: now,
  },
];

export const executeType = async (prisma: PrismaClient): Promise<void> => {
  for (const type of types) {
    const exists = await prisma.type.findFirst({ where: { name: type.name } });
    if (!exists) {
      await prisma.type.create({ data: type });
      console.log(`Created type: ${type.name}`);
    } else {
      console.log(`Type already exists: ${type.name}`);
    }
  }
};

export const executeListType = async (prisma: PrismaClient): Promise<void> => {
  for (const listType of listTypes) {
    const exists = await prisma.listType.findFirst({
      where: { name: listType.name, typeId: listType.typeId },
    });
    if (!exists) {
      await prisma.listType.create({ data: listType });
      console.log(`Created listType: ${listType.name}`);
    } else {
      console.log(`ListType already exists: ${listType.name}`);
    }
  }
};
