import { randomBytes } from 'crypto';
import { PostgresConnectionManager } from '../index';

const randomString = (l?: number) => randomBytes(l || 20).toString('hex');

(async () => {
  PostgresConnectionManager.connect();
  const client = PostgresConnectionManager.getPrismaClient();

  await client.user.create({
    data: {
      name: 'test',
      email: `${randomString(8)}@example.com`,
    },
  });

  const amountToCreate = Math.round(Math.random() * 1000);
  console.debug(`Seeding db with ${amountToCreate} records`);

  for (const _ of Array(amountToCreate)) {
    const newEntry = {
      title: randomString(),
      description: randomString(100),
    };
  }

  await client.$disconnect();
  console.debug(`Finished seeding`);
  process.exit(1);
})();
