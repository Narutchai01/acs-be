import { ListType, PrismaClient, Type } from '@prisma/client';

export const types: Array<Omit<Type, 'id' | 'createdAt' | 'updatedAt'>> = [
  {
    name: 'type',
  },
  {
    name: 'field',
  },
  {
    name: 'category',
  },
  {
    name: 'news',
  },
];

export const listTypes: Array<
  Omit<ListType, 'id' | 'createdAt' | 'updatedAt'>
> = [
  {
    name: 'Artificial intelligence',
    typeId: 2,
  },
  {
    name: 'Network',
    typeId: 2,
  },
  {
    name: 'Cloud computing',
    typeId: 2,
  },
  {
    name: 'Security',
    typeId: 2,
  },
  {
    name: 'Computer Architecture',
    typeId: 2,
  },
  {
    name: 'Software Engineering',
    typeId: 2,
  },
  {
    name: 'Computational Theory',
    typeId: 2,
  },
  {
    name: 'GIS',
    typeId: 2,
  },
  {
    name: 'Game Design',
    typeId: 2,
  },
  {
    name: 'Data Science and analytics',
    typeId: 2,
  },
  {
    name: 'Data Structures and Algorithms',
    typeId: 2,
  },
  {
    name: 'Research',
    typeId: 1,
  },
  {
    name: 'Web Application',
    typeId: 1,
  },
  {
    name: 'Mobile Application',
    typeId: 1,
  },
  {
    name: 'Internet Of Things',
    typeId: 1,
  },

  {
    name: 'ข่าวประชาสัมพันธ์',
    typeId: 4,
  },
  {
    name: 'ความสำเร็จนักศึกษา',
    typeId: 4,
  },
  {
    name: 'งานกิจกรรมนักศึกษา',
    typeId: 4,
  },
  {
    name: 'announcement',
    typeId: 4,
  },
  {
    name: 'newshighlight',
    typeId: 4,
  },
  {
    name: 'Education',
    typeId: 3,
  },
  {
    name: 'Medical',
    typeId: 3,
  },
  {
    name: 'Research Category', // Changed to avoid duplicate
    typeId: 3,
  },
  {
    name: 'Business',
    typeId: 3,
  },
  {
    name: 'Game',
    typeId: 3,
  },
  {
    name: 'Agricultural',
    typeId: 3,
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
    try {
      const exists = await prisma.listType.findFirst({
        where: {
          AND: [{ name: listType.name }, { typeId: listType.typeId }],
        },
      });

      if (!exists) {
        await prisma.listType.create({ data: listType });
        console.log(`✅ Created listType: ${listType.name}`);
      } else {
        console.log(`⚠️  ListType already exists: ${listType.name}`);
      }
    } catch (error) {
      console.error(`❌ Failed to process listType: ${listType.name}`, error);
    }
  }
};
