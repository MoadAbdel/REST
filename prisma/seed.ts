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
      { name: 'Épicéa', type: 'softwood', hardness: 'tender' },
      { name: 'Pin', type: 'softwood', hardness: 'medium_hard' },
      { name: 'Padouk', type: 'exotic_wood', hardness: 'hard' },
      { name: 'Érable', type: 'noble_and_hardwoods', hardness: 'medium_hard' },
      { name: 'Hêtre', type: 'noble_and_hardwoods', hardness: 'medium_hard' },
      { name: 'Itauba', type: 'exotic_wood', hardness: 'hard' },
      { name: 'Douglas', type: 'softwood', hardness: 'tender' },
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
