import { randomBytes } from 'crypto';
import { DBConnectionManager } from '../index';

const randomString = (l?: number) => randomBytes(l || 20).toString('hex');

(async () => {
  DBConnectionManager.connect();
  const client = DBConnectionManager.getPrismaClient();

  await client.admin_users.delete({
    where: {
      email: `admin@example.com`,
    },
  });
  await client.admin_users.create({
    data: {
      email: `admin@example.com`,
      firstName: `Steeve-${randomString(4)}`,
      lastName: `Jobs-${randomString(4)}`,
      password: 'password',
    },
  });

  console.debug(`(Re)-created test admin account`);
  // const amountToCreate = Math.round(Math.random() * 1000);
  // console.debug(`Seeding db with ${amountToCreate} records`);

  // for (const _ of Array(amountToCreate)) {
  //   const newEntry = {
  //     title: randomString(),
  //     description: randomString(100),
  //   };
  // }

  await client.$disconnect();
  console.debug(`Finished seeding`);
  process.exit(1);
})();
