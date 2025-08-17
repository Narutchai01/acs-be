import { PrismaClient, Prisma } from '@prisma/client';

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

export const executeeducationLevelSeed = async (
  prisma: PrismaClient,
): Promise<void> => {
  try {
    for (const educationLevel of educationLevels) {
      const educationLevelData: Prisma.EducationLevelCreateInput =
        educationLevel;
      const exists = await prisma.educationLevel.findFirst({
        where: { level: educationLevelData.level },
      });

      if (!exists) {
        await prisma.educationLevel.create({ data: educationLevelData });
        console.log(`Created education level: ${educationLevelData.level}`);
      } else {
        console.log(`Type already exists: ${educationLevel.level}`);
      }
    }
  } catch (error) {
    console.error('Error executing type course seed:', error);
    throw error;
  }
};
