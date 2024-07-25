import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { MailController } from './controller/mail.controller';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue(
      { name: 'mail-queue' },
    )
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule { }
