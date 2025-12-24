import { Prisma, PrismaClient } from '@prisma/client';

export const majorPositions: Prisma.MajorPositionCreateInput[] = [
  {
    positionTh: 'ผู้ช่วยศาสตราจารย์',
    positionEn: 'Assistant Professor',
  },
  {
    positionTh: 'รองศาสตราจารย์',
    positionEn: 'Associate Professor',
  },
  {
    positionTh: 'ศาสตราจารย์',
    positionEn: 'Professor',
  },
];

export const executeMajorPosition = async (
  prisma: PrismaClient,
): Promise<void> => {
  try {
    for (const majorPosition of majorPositions) {
      const majorPositionData: Prisma.MajorPositionCreateInput = majorPosition;
      const exists = await prisma.majorPosition.findFirst({
        where: { positionTh: majorPositionData.positionTh },
      });

      if (!exists) {
        await prisma.majorPosition.create({ data: majorPositionData });
        console.log(`Created major position: ${majorPositionData.positionEn}`);
      } else {
        console.log(`Type already exists: ${majorPosition.positionEn}`);
      }
    }
  } catch (error) {
    console.error('Error executing major position seed:', error);
    throw error;
  }
};
