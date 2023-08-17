import { Controller, Get, Res, Req } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller()
export class AppController {
  @Get('/')
  test(
    @Res({ passthrough: true }) reply: FastifyReply,
    @Req() request: FastifyRequest,
  ) {
    return reply.status(418).send();
  }
}
