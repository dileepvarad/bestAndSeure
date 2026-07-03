import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@bestsecure.com';
  const password = 'admin'; // simple default password
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (!existing) {
    await prisma.adminUser.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    console.log(`Admin user created: ${email} / ${password}`);
  } else {
    console.log(`Admin user already exists.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
