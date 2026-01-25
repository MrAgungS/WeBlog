import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    { emit: 'stdout', level: 'error' },
    { emit: 'stdout', level: 'warn' },
  ],
});
prisma.$disconnect().catch(async (e) => {
  console.error('Failed to disconnect from Prisma Client', e);
  process.exit(1);
});

export default prisma;
