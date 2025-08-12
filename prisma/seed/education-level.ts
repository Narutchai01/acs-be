import { PrismaClient } from '@prisma/client';

export const educationLevels = [
  {
    level: 'B.A.',
  },
  {
    level: 'B.Sc.',
  },
  {
    level: 'B.Eng.',
  },
  {
    level: 'M.A.',
  },
  {
    level: 'M.Sc.',
  },
  {
    level: 'M.Eng.',
  },
  {
    level: 'Ph.D.',
  },
];

export const executeeducationLevelSeed = async (prisma: PrismaClient) => {
  await prisma.educationLevel.createMany({
    data: educationLevels,
    skipDuplicates: true,
  });
};
