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
  await prisma.majorPosition.createMany({
    data: majorPositions,
    skipDuplicates: true,
  });
};
