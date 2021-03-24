import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { SeederModule } from './seeders/seeder.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule, {
    logger: ['error'] // only errors
  });
  app
    .select(CommandModule)
    .get(CommandService)
    .exec();
}
bootstrap();