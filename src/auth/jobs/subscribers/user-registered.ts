import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { UserExchange } from '../constants/exchanges';
import { UserRegisteredRouting } from '../constants/routing-keys';
import { UserRegisteredQueue } from '../constants/queues';

@Injectable()
export class UserRegistered {
  private readonly logger: Logger = new Logger(UserRegistered.name);

  constructor(private readonly mailService: MailerService,
              private readonly configService: ConfigService) {
  }

  @RabbitSubscribe({
    exchange: UserExchange,
    routingKey: UserRegisteredRouting,
    queue: UserRegisteredQueue,
  })
  async sendEmailMessage(message: any): Promise<void> {
    console.log(message);
  }
}