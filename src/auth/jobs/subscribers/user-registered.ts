import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { UserRegisteredQueue } from '../constants/queues';
import { UserRegisteredJobDto } from '../../dto/jobs/user-registered-job-dto';

@Injectable()
@Controller()
export class UserRegistered {
  private readonly logger: Logger = new Logger(UserRegistered.name);

  constructor(private readonly mailService: MailerService,
              private readonly configService: ConfigService) {
  }

  @EventPattern(UserRegisteredQueue)
  async sendEmailMessage(@Payload() message: Readonly<UserRegisteredJobDto>,
                         @Ctx() context: RmqContext): Promise<void> {
    await this.mailService.sendMail({
      to: message.email,
      template: 'public/templates/user-register',
      context: {
        email: message.email,
      },
    }).catch(error => {
      this.logger.error(error);
    });
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}