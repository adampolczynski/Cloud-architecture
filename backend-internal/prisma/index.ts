import { PrismaClient } from '@prisma/client';

function StaticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}
interface IDBConnectionManager {
  connect(): void;
  getPrismaClient(): PrismaClient;
}

@StaticImplements<IDBConnectionManager>()
export class DBConnectionManager {
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
