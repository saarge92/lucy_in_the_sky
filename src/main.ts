import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedisIoAdapter } from './common/adapters/redis-io-adapter';
import { ConfigService } from '@nestjs/config';
import { UserRegisteredQueue } from './auth/jobs/constants/queues';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  const configService: ConfigService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBITMQ_URI')],
      queue: UserRegisteredQueue,
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(process.env.SERVER_PORT);
}

bootstrap().catch(console.log);
