import { prisma } from '../app.js';

async function main() {
  // Seed users
  await prisma.user.createMany({
    data: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'hashed_password_here',
      },
    ],
    skipDuplicates: true,
  });

  // Seed woods
  await prisma.wood.createMany({
    data: [
      {
        name: 'Oak',
        type: 'noble_and_hardwoods',
        hardness: 'hard',
      },
      {
        name: 'Pine',
        type: 'softwood',
        hardness: 'tender',
      },
      {
        name: 'Ebony',
        type: 'exotic_wood',
        hardness: 'hard',
      },
    ],
    skipDuplicates: true,
  });

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
