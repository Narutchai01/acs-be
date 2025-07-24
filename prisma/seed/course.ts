import { Prisma, PrismaClient } from '@prisma/client';

export const typeCourses: Prisma.TypeCourseCreateInput[] = [
  {
    name: 'กลุ่มวิชาเฉพาะประเภทวิชาแกน',
    description: 'Learn the fundamentals of computer science.',
  },
  {
    name: 'กลุ่มวิชาเฉพาะประเภทวิชาเฉพาะด้าน',
    description: 'Explore advanced mathematical concepts.',
  },
  {
    name: 'กลุ่มวิชาวิทยาการคอมพิวเตอร์',
    description: 'Understand the principles of physics.',
  },
  {
    name: 'กลุ่มวิชาวิทยาศาสตร์ข้อมูล',
    description: 'Understand the principles of data science.',
  },
  {
    name: 'กลุ่มวิชาธุรกิจดิจิทัล',
    description: 'Understand the principles of digital business.',
  },
];

export const executeTypeCourse = async (
  prisma: PrismaClient,
): Promise<void> => {
  try {
    for (const typeCourse of typeCourses) {
      const typeCourseData: Prisma.TypeCourseCreateInput = typeCourse;
      const exists = await prisma.typeCourse.findFirst({
        where: { name: typeCourseData.name },
      });

      if (!exists) {
        await prisma.typeCourse.create({ data: typeCourseData });
        console.log(`Created type: ${typeCourseData.name}`);
      } else {
        console.log(`Type already exists: ${typeCourseData.name}`);
      }
    }
  } catch (error) {
    console.error('Error executing type course seed:', error);
    throw error;
  }
};
