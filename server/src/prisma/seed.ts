const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Optionally clear existing entries
  await prisma.user.deleteMany({});
  console.log('Previous users deleted.');

  const users = [
    {
      first_name: 'Set',
      last_name: 'Nouri',
      email: 'setnouri@test.com',
      password: '$2b$10$qHzzSheigB4Z65OktqyfHOP6BYsl/kh3NOOEfFyv/VcN3iaZoz19S',
    },
    {
      first_name: 'Brian',
      last_name: 'Hsieh',
      email: 'brianhsieh@test.com',
      password: '$2b$10$qHzzSheigB4Z65OktqyfHOP6BYsl/kh3NOOEfFyv/VcN3iaZoz19S',
    },
    {
      first_name: 'Leanne',
      last_name: 'Holmes',
      email: 'leanneholmes@test.com',
      password: '$2b$10$qHzzSheigB4Z65OktqyfHOP6BYsl/kh3NOOEfFyv/VcN3iaZoz19S',
    },
    {
      first_name: 'Deanna',
      last_name: 'Lepke',
      email: 'leanneholmes@test.com',
      password: '$2b$10$qHzzSheigB4Z65OktqyfHOP6BYsl/kh3NOOEfFyv/VcN3iaZoz19S',
    },
    {
      first_name: 'Leanne',
      last_name: 'Holmes',
      email: 'leanneholmes@test.com',
      password: '$2b$10$qHzzSheigB4Z65OktqyfHOP6BYsl/kh3NOOEfFyv/VcN3iaZoz19S',
    },
    {
      first_name: 'Aryan',
      last_name: 'Jand',
      email: 'aryanjand@test.com',
      password: '$2b$10$qHzzSheigB4Z65OktqyfHOP6BYsl/kh3NOOEfFyv/VcN3iaZoz19S',
    },
  ];
  console.log(`=================================================================================================`);
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    console.log(`🚀 User ${JSON.stringify(user)} Created.\n`);
  }
  console.log(`=================================================================================================`);
  console.log(`${users.length} Users Created.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
