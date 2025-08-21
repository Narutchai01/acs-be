import * as dayjs from 'dayjs';
import { ListType, PrismaClient, Type } from '@prisma/client';

const now = dayjs().toDate();

export const types: Array<Omit<Type, 'id'>> = [
  {
    name: 'type',
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'field',
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'category',
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'news',
    createdDate: now,
    updatedDate: now,
  },
];

export const listTypes: Array<Omit<ListType, 'id'>> = [
  {
    name: 'Artificial intelligence',
    typeId: 2,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'Network',
    typeId: 2,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'Cloud computing',
    typeId: 2,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'Security',
    typeId: 2,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'Computer Architecture',
    typeId: 2,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'Software Engineering',
    typeId: 2,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'Computational Theory',
    typeId: 2,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'GIS',
    typeId: 2,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'Game Design',
    typeId: 2,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'Data Science and analytics',
    typeId: 2,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'Data Structures and Algorithms',
    typeId: 2,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'Research',
    typeId: 1,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'Web Application',
    typeId: 1,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'Mobile Application',
    typeId: 1,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'Internet Of Things',
    typeId: 1,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'ข่าวและกิจกรรม',
    typeId: 4,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'ความสำเร็จ',
    typeId: 4,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'งานกิจกรรมนักศึกษา',
    typeId: 4,
    createdDate: now,
    updatedDate: now,
  },
  {
    name: 'announcement',
    typeId: 4,
    createdDate: now,
    updatedDate: now,
  },
    {
    name: 'newshigtlight',
    typeId: 4,
    createdDate: now,
    updatedDate: now,
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
