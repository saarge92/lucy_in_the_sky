import { IoAdapter } from '@nestjs/platform-socket.io';
import { ConfigService } from '@nestjs/config';
import * as redisIoAdapter from 'socket.io-redis';

export class RedisIoAdapter extends IoAdapter {
  private configService: ConfigService = new ConfigService();


  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    // @ts-ignore
    const redisAdapter = redisIoAdapter({
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
    });

    server.adapter(redisAdapter);
    return server;
  }
}