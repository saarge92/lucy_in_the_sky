import { IoAdapter } from '@nestjs/platform-socket.io';
import { ConfigService } from '@nestjs/config';
import * as redisIoAdapter from 'socket.io-redis';
import { INestApplication } from '@nestjs/common';

export class RedisIoAdapter extends IoAdapter {
  private configService: ConfigService<Record<string, any>>;

  constructor(app: INestApplication) {
    super(app);
    this.configService = new ConfigService();
  }

  createIOServer(port: number, options?: any): any {
    const redisAdapter = redisIoAdapter({
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
    });
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}