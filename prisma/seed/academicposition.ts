import { Prisma, PrismaClient } from '@prisma/client';

export const academicPositions: Prisma.AcademicPositionCreateInput[] = [
  {
    positionTh: 'ศาสตราจารย์',
    positionEn: 'Professor',
  },
  {
    positionTh: 'รองศาสตราจารย์',
    positionEn: 'Associate Professor',
  },
  {
    positionTh: 'ผู้ช่วยศาสตราจารย์',
    positionEn: 'Assistant Professor',
  },
  {
    positionTh: 'อาจารย์',
    positionEn: 'Lecturer',
  },
];

export const executeAcademicPosition = async (
  prisma: PrismaClient,
): Promise<void> => {
  try {
    for (const academicPosition of academicPositions) {
      const academicPositionData: Prisma.AcademicPositionCreateInput =
        academicPosition;
      const exists = await prisma.academicPosition.findFirst({
        where: { positionTh: academicPositionData.positionTh },
      });

      if (!exists) {
        await prisma.academicPosition.create({ data: academicPositionData });
        console.log(`Created position: ${academicPositionData.positionTh}`);
      } else {
        console.log(`Position already exists: ${academicPosition.positionTh}`);
      }
    }
  } catch (error) {
    console.error('Error executing academic position seed:', error);
    throw error;
  }
};
