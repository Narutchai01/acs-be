import { executeRole } from './role';
import { executeListType, executeType } from './type';
import { PrismaClient } from '@prisma/client';
import { executeTypeCourse } from './course';
import { executeAcademicPosition } from './academicposition';
import { executeeducationLevelSeed } from './education-level';
// import { PrismaClient } from 'generated/prisma';
const prisma = new PrismaClient();

async function main() {
  await executeRole(prisma);
  await executeType(prisma);
  await executeListType(prisma);
  await executeTypeCourse(prisma);
  await executeAcademicPosition(prisma);
  await executeeducationLevelSeed(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
