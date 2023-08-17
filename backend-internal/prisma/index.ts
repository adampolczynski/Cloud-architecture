import { PrismaClient } from '@prisma/client';

function StaticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}
interface IPostgresConnectionManager {
  connect(): void;
  getPrismaClient(): PrismaClient;
}

@StaticImplements<IPostgresConnectionManager>()
export class PostgresConnectionManager {
  private static prismaClient: PrismaClient;

  static async connect() {
    if (this.prismaClient) {
      console.warn('Already connected');
      return;
    }
    this.prismaClient = new PrismaClient();
  }
  static getPrismaClient(): PrismaClient {
    return this.prismaClient;
  }
}
