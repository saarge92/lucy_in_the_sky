import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedisIoAdapter } from './common/adapters/redis-io-adapter';
import {Promise} from "bluebird"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // @ts-ignore
  global.Promise = Promise;
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Goods API')
    .setDescription('Simple API for users authorization & goods selection')
    .setVersion('1.0')
    .addTag('goods')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useWebSocketAdapter(new RedisIoAdapter(app));
  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
