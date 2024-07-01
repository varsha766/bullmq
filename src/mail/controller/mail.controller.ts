import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from '../services/mail.service';
@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) { }
  @Post('send/mail')
  async sendmail(
    @Body()
    body: { serverName: string; to: string; subject: string; message: any }[],
  ) {
    this.mailService.addJobsInBulk(body)
    return { message: 'Mail job added to the queue' };
  }
}
