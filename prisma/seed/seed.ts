import { executeRole } from './role';
import { PrismaClient } from '@prisma/client';
// import { PrismaClient } from 'generated/prisma';
const prisma = new PrismaClient();

async function main() {
  await executeRole(prisma);
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
