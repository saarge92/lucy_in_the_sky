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
    const uriRedis = 'redis://' + this.configService.get<string>('REDIS_HOST') + ':'
      + this.configService.get('REDIS_PORT');
    const redisAdapter = redisIoAdapter.createAdapter(uriRedis);
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}