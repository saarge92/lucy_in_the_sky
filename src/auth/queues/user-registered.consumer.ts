import { Process, Processor } from '@nestjs/bull';
import { USER_REGISTERED } from '../constants/email.auth';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger, Scope } from '@nestjs/common';
import { Job } from 'bull';
import { ConfigService } from '@nestjs/config';

@Processor({
  name: USER_REGISTERED,
})
export class UserRegisteredConsumer {
  private readonly logger: Logger = new Logger(UserRegisteredConsumer.name);

  constructor(private readonly mailService: MailerService,
              private readonly configService: ConfigService) {
  }

  @Process()
  async sendEmailMessage(job: Job): Promise<any> {
    const email = job.data;
    await this.mailService.sendMail({
      to: email,
      from: this.configService.get('MAIL_FROM'),
      subject: ' Успешна регистрация',
      template: 'user-register',
      context: {
        email,
      },
    }).catch(error => {
      this.logger.error(error);
    });
  }
}