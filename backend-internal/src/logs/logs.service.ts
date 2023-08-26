import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DBConnectionManager } from 'prisma';

@Injectable()
export class LogsService {
  createOne(log: Prisma.LogsCreateInput) {
    const client = DBConnectionManager.getPrismaClient();
    console.log('create log: ', log);
    return client.logs.create({
      data: log,
    });
  }
}
